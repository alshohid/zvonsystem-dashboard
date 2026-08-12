/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import CreateInvoiceModal from './CreateInvoiceModal';
import DeleteInvoiceModal from './DeleteInvoiceModal';
import EditInvoiceModal from './EditInvoiceModal';
import EditSubscriptionModal from './EditSubscriptionModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import InvoiceTable from './InvoiceTable';
import InvoiceTableSkeleton from './InvoiceTableSkeleton';
import PaymentControlStatsGrid from './PaymentControlStatsGrid';
import SubscriptionDetailsModal from './SubscriptionDetailsModal';
import SubscriptionTable from './SubscriptionTable';
import SubscriptionTableSkeleton from './SubscriptionTableSkeleton';
import ReusablePagination from '@/src/components/tables/ReusablePagination';
import TableTabSwitch, { type TableTab } from './TableTabSwitch';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import type {
  ArtistSubscription,
  CreateInvoiceValues,
  InvoiceStatus,
  PaymentControlStat,
  PricingInvoice,
  SubscriptionEditValues,
} from './types';
import {
  useSubscriptionPaymentTransactionListQuery,
  useEditSingleSubscriptionPaymentTransactionMutation,
} from '@/src/redux/features/subscription/subscriptionApi';
import { useDebouncedValue } from '@/src/lib/helper/useDebouncedValue';
import type { ITransaction, IEditTransactionPlanRequest } from '@/src/types/billingTypes';
import {
  useDeleteInvoiceMutation,
  useGetAllInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetNoticeStatsQuery,
  usePostNoticeMutation,
  useUpdateInvoiceAsPaidMutation,
  useUpdateInvoiceMutation,
} from '@/src/redux/features/noticeManagement/noticeApi';
import type {
  CreateInvoiceRequest,
  Invoice,
  InvoiceRequestStatus,
  UpdateInvoiceRequest,
} from '@/src/types/noticeTypes';

type TableTabKey = 'subscription' | 'invoices';

const TABLE_TABS: TableTab<TableTabKey>[] = [
  { key: 'subscription', label: 'Subscription' },
  { key: 'invoices', label: 'Invoices' },
];

const PAGE_SIZE = 10;

function toInvoiceStatus(status: string): InvoiceStatus {
  const normalized = status.toLowerCase();
  if (normalized === 'paid') return 'paid';
  if (normalized === 'pending') return 'pending';
  if (normalized === 'pay-per-release' || normalized === 'pay_per_release') {
    return 'pay-per-release';
  }
  if (normalized === 'draft') return 'draft';
  return 'cancelled';
}

const INVOICE_REQUEST_STATUSES: InvoiceRequestStatus[] = [
  'DRAFT',
  'PAID',
  'PENDING',
  'FAILED',
  'CANCELLED',
  'OVERDUE',
];

function toRequestStatus(status: string): InvoiceRequestStatus {
  const normalized = status.toUpperCase();
  return INVOICE_REQUEST_STATUSES.includes(normalized as InvoiceRequestStatus)
    ? (normalized as InvoiceRequestStatus)
    : 'PENDING';
}

function mapApiInvoiceToPricingInvoice(invoice: Invoice): PricingInvoice {
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    artistName: invoice.artist_name,
    email: invoice.email,
    amount: Number(invoice.amount) || 0,
    date: invoice.billing_date ?? '',
    status: toInvoiceStatus(invoice.status),
    paymentMethod: invoice.payment_method,
    description: invoice.description,
  };
}

function mapTransactionToSubscription(transaction: ITransaction): ArtistSubscription {
  const createdDate = new Date(transaction.createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return {
    id: transaction.id,
    artistName: transaction.planName,
    email: `${transaction.referenceNumber}@transaction.local`,
    plan: transaction.plan.name.toLowerCase() as ArtistSubscription['plan'],
    status: transaction.status === 'completed' ? 'active' : 'trial',
    amount: transaction.amount,
    billingCycle: transaction.billingPeriod.toLowerCase() as ArtistSubscription['billingCycle'],
    releasesUsed: 0,
    startDate: formattedDate,
  };
}

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export default function PaymentControlContainer() {
  const [tab, setTab] = useTabsQueryState<TableTabKey>('tab', 'subscription');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingInvoiceId, setViewingInvoiceId] = useState<string | null>(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const [deletingInvoiceId, setDeletingInvoiceId] = useState<string | null>(null);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [createInvoiceError, setCreateInvoiceError] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(query, 500);


  const {
    data: transactionHistory,
    isLoading: isTransactionHistoryLoading,
    isFetching,
    isError,
  } = useSubscriptionPaymentTransactionListQuery({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
  });
  const [editTransaction, { isLoading: isEditing }] =
    useEditSingleSubscriptionPaymentTransactionMutation();

  const {
    data: invoiceData,
    isLoading: isInvoicesLoading,
    isFetching: isInvoicesFetching,
    isError: isInvoicesError,
  } = useGetAllInvoicesQuery({
    page: invoicePage,
    limit: PAGE_SIZE,
    search: debouncedSearch,
  });
  const { data: noticeStatsData } = useGetNoticeStatsQuery();
  const { data: viewingInvoiceData, isLoading: isViewingInvoiceLoading } =
    useGetInvoiceByIdQuery(viewingInvoiceId ?? '', { skip: !viewingInvoiceId });

  const [postInvoice, { isLoading: isCreatingInvoice }] = usePostNoticeMutation();
  const [updateInvoice, { isLoading: isUpdatingInvoice }] = useUpdateInvoiceMutation();
  const [deleteInvoice, { isLoading: isDeletingInvoice }] = useDeleteInvoiceMutation();
  const [updateInvoiceAsPaid] = useUpdateInvoiceAsPaidMutation();

  useEffect(() => {
    setPage(1);
    setInvoicePage(1);
  }, [debouncedSearch]);

  const apiTransactions = transactionHistory?.data ?? [];
  const paginationMeta = transactionHistory?.meta;

  const subscriptions = useMemo(() => {
    return apiTransactions.map(mapTransactionToSubscription);
  }, [apiTransactions]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSubscriptions = subscriptions.filter(
    subscription =>
      subscription.artistName.toLowerCase().includes(normalizedQuery) ||
      subscription.email.toLowerCase().includes(normalizedQuery),
  );

  const apiInvoices = invoiceData?.data?.items ?? [];
  const invoiceMeta = invoiceData?.data?.meta;

  const invoices = useMemo(() => {
    return apiInvoices.map(mapApiInvoiceToPricingInvoice);
  }, [apiInvoices]);

  const viewingSubscription = subscriptions.find(s => s.id === viewingId) ?? null;
  const editingSubscription = subscriptions.find(s => s.id === editingId) ?? null;

  const viewingInvoice = viewingInvoiceData?.data ?? null;
  const editingInvoice = apiInvoices.find(i => i.id === editingInvoiceId) ?? null;
  const deletingInvoice = apiInvoices.find(i => i.id === deletingInvoiceId) ?? null;

  const invoiceStats = useMemo<PaymentControlStat[]>(() => {
    const stats = noticeStatsData?.data;
    return [
      {
        id: 'total-revenue',
        label: 'Total Revenue',
        value: stats ? formatCurrency(stats.total_revenue) : '—',
      },
      {
        id: 'total-invoices',
        label: 'Total Invoices',
        value: stats ? String(stats.total_invoices) : '—',
      },
      {
        id: 'paid-invoices',
        label: 'Paid Invoices',
        value: stats ? String(stats.paid_invoices) : '—',
      },
      {
        id: 'pending-invoices',
        label: 'Pending Invoices',
        value: stats ? String(stats.pending_invoices) : '—',
      },
    ];
  }, [noticeStatsData]);

  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

  const invoiceTotalPages = invoiceMeta?.totalPages ?? 1;
  const invoiceTotalItems = invoiceMeta?.total ?? 0;

  const handleSaveSubscription = async (id: string, values: SubscriptionEditValues) => {
    const transaction = apiTransactions.find(t => t.id === id);
    if (!transaction) return;

    const editData: IEditTransactionPlanRequest = {
      displayName: values.plan.toUpperCase(),
      price: Number(values.amount) || 0,
      billingPeriod: values.billingCycle.toUpperCase() as IEditTransactionPlanRequest['billingPeriod'],
      maxReleasesPerYear: Number(values.releasesUsed) || 0,
      isActive: values.status !== 'cancelled',
    };

    try {
      await editTransaction({
        planId: transaction.plan.id,
        data: editData,
      }).unwrap();
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update transaction:', error);
    }
  };

  const handleCreateInvoice = async (values: CreateInvoiceValues) => {
    const payload: CreateInvoiceRequest = {
      artist_name: values.artistName.trim(),
      email: values.email.trim(),
      amount: Number(values.amount) || 0,
      status: toRequestStatus(values.status),
      billing_date: values.billingDate,
      description: values.description,
      currency: values.currency,
      payment_method: values.paymentMethod,
    };

    try {
      await postInvoice(payload).unwrap();
      setCreateInvoiceOpen(false);
      setCreateInvoiceError(null);
      toast.success('Invoice created successfully.');
    } catch (err) {
      // Keep the modal open and surface the API error(s) inside the form.
      setCreateInvoiceError(getErrorMessage(err, 'Failed to create invoice.'));
    }
  };

  const handleSaveInvoice = async (id: string, request: UpdateInvoiceRequest) => {
    try {
      await updateInvoice({ id, data: request }).unwrap();
      setEditingInvoiceId(null);
      setViewingInvoiceId(null);
      toast.success('Invoice updated successfully.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update invoice.'));
    }
  };

  const handleDeleteInvoice = async () => {
    if (!deletingInvoiceId) return;

    try {
      await deleteInvoice(deletingInvoiceId).unwrap();
      setDeletingInvoiceId(null);
      toast.success('Invoice deleted successfully.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete invoice.'));
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateInvoiceAsPaid({ id, payment_method: 'manual' }).unwrap();
      toast.success('Invoice marked as paid.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to mark invoice as paid.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Payment Control</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setCreateInvoiceError(null);
            setCreateInvoiceOpen(true);
          }}
          disabled={isCreatingInvoice}
          className="inline-flex items-center gap-1.5 rounded-md leading-4 bg-primary px-4 py-3 text-[1rem] font-medium text-[#1D1F2C] hover:opacity-90"
        >
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      <PaymentControlStatsGrid stats={invoiceStats} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableTabSwitch tabs={TABLE_TABS} activeKey={tab} onChange={setTab} />
        <SearchInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search artists, invoices..."
          containerClassName="w-full sm:w-72"
        />
      </div>

      <div>
        <h2 className="mb-3 text-[15px] font-semibold text-[#101828]">Override Requests</h2>

        {tab === 'subscription' ? (
          <>
            {isTransactionHistoryLoading || (isFetching && subscriptions.length === 0) ? (
              <SubscriptionTableSkeleton count={PAGE_SIZE} />
            ) : isError ? (
              <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
                <p className="text-sm font-medium text-[#B42318]">
                  Failed to load subscriptions. Please try again later.
                </p>
              </div>
            ) : (
              <>
                <SubscriptionTable
                  subscriptions={filteredSubscriptions}
                  onViewDetails={setViewingId}
                  onEditPlan={setEditingId}
                  isLoading={isFetching && subscriptions.length > 0}
                />

                {totalPages > 1 && (
                  <ReusablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageSize={PAGE_SIZE}
                    onPageChange={setPage}
                    itemLabel="subscriptions"
                    className="rounded-2xl border border-[#E9EDF5]"
                  />
                )}
              </>
            )}
          </>
        ) : isInvoicesLoading || (isInvoicesFetching && invoices.length === 0) ? (
          <InvoiceTableSkeleton count={PAGE_SIZE} />
        ) : isInvoicesError ? (
          <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
            <p className="text-sm font-medium text-[#B42318]">
              Failed to load invoices. Please try again later.
            </p>
          </div>
        ) : (
          <>
            <InvoiceTable
              invoices={invoices}
              onViewDetails={setViewingInvoiceId}
              onEdit={setEditingInvoiceId}
              onDelete={setDeletingInvoiceId}
              onMarkAsPaid={handleMarkAsPaid}
              isLoading={isInvoicesFetching && invoices.length > 0}
            />

            {invoiceTotalPages > 1 && (
              <ReusablePagination
                currentPage={invoicePage}
                totalPages={invoiceTotalPages}
                totalItems={invoiceTotalItems}
                pageSize={PAGE_SIZE}
                onPageChange={setInvoicePage}
                itemLabel="invoices"
                className="rounded-2xl border border-[#E9EDF5]"
              />
            )}
          </>
        )}
      </div>

      <SubscriptionDetailsModal
        subscription={viewingSubscription}
        onClose={() => setViewingId(null)}
        onEdit={id => {
          setViewingId(null);
          setEditingId(id);
        }}
      />

      <EditSubscriptionModal
        subscription={editingSubscription}
        onClose={() => setEditingId(null)}
        onSave={handleSaveSubscription}
        isLoading={isEditing}
      />

      <InvoiceDetailsModal
        invoice={viewingInvoice}
        onClose={() => setViewingInvoiceId(null)}
        onEdit={id => {
          setViewingInvoiceId(null);
          setEditingInvoiceId(id);
        }}
        isLoading={isViewingInvoiceLoading}
      />

      <EditInvoiceModal
        invoice={editingInvoice}
        onClose={() => setEditingInvoiceId(null)}
        onSave={handleSaveInvoice}
        isLoading={isUpdatingInvoice}
      />

      <DeleteInvoiceModal
        invoice={deletingInvoice}
        isOpen={!!deletingInvoiceId}
        isDeleting={isDeletingInvoice}
        onClose={() => setDeletingInvoiceId(null)}
        onConfirm={handleDeleteInvoice}
      />

      <CreateInvoiceModal
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        onCreate={handleCreateInvoice}
        isLoading={isCreatingInvoice}
        error={createInvoiceError}
      />
    </div>
  );
}


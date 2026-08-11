/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import CreateInvoiceModal from './CreateInvoiceModal';
import EditSubscriptionModal from './EditSubscriptionModal';
import InvoiceTable from './InvoiceTable';
import { MOCK_INVOICES, PAYMENT_CONTROL_STATS } from './mockPricingManagementData';
import PaymentControlStatsGrid from './PaymentControlStatsGrid';
import SubscriptionDetailsModal from './SubscriptionDetailsModal';
import SubscriptionTable from './SubscriptionTable';
import SubscriptionTableSkeleton from './SubscriptionTableSkeleton';
import ReusablePagination from '@/src/components/tables/ReusablePagination';
import TableTabSwitch, { type TableTab } from './TableTabSwitch';
import type { ArtistSubscription, SubscriptionEditValues } from './types';
import {
  useSubscriptionPaymentTransactionListQuery,
  useEditSingleSubscriptionPaymentTransactionMutation,
} from '@/src/redux/features/subscription/subscriptionApi';
import { useDebouncedValue } from '@/src/lib/helper/useDebouncedValue';
import type { ITransaction, IEditTransactionPlanRequest } from '@/src/types/billingTypes';

type TableTabKey = 'subscription' | 'invoices';

const TABLE_TABS: TableTab<TableTabKey>[] = [
  { key: 'subscription', label: 'Subscription' },
  { key: 'invoices', label: 'Invoices' },
];

const PAGE_SIZE = 10;

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

export default function PaymentControlContainer() {
  const [tab, setTab] = useTabsQueryState<TableTabKey>('tab', 'subscription');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
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

  const [editTransaction, { isLoading: isEditing }] = useEditSingleSubscriptionPaymentTransactionMutation();

  useEffect(() => {
    setPage(1);
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
  const filteredInvoices = MOCK_INVOICES.filter(
    invoice =>
      invoice.artistName.toLowerCase().includes(normalizedQuery) ||
      invoice.email.toLowerCase().includes(normalizedQuery) ||
      invoice.invoiceNumber.toLowerCase().includes(normalizedQuery),
  );

  const viewingSubscription = subscriptions.find(s => s.id === viewingId) ?? null;
  const editingSubscription = subscriptions.find(s => s.id === editingId) ?? null;

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

  const totalPages = paginationMeta?.totalPages ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

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
          onClick={() => setCreateInvoiceOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md leading-4 bg-primary px-4 py-3 text-[1rem] font-medium text-[#1D1F2C] hover:opacity-90"
        >
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      <PaymentControlStatsGrid stats={PAYMENT_CONTROL_STATS} />

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
        ) : (
          <InvoiceTable invoices={filteredInvoices} />
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

      <CreateInvoiceModal
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        onCreate={() => setCreateInvoiceOpen(false)}
      />
    </div>
  );
}

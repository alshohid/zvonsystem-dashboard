'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import CreateInvoiceModal from './CreateInvoiceModal';
import EditSubscriptionModal from './EditSubscriptionModal';
import InvoiceTable from './InvoiceTable';
import { MOCK_INVOICES, MOCK_SUBSCRIPTIONS, PAYMENT_CONTROL_STATS } from './mockPricingManagementData';
import PaymentControlStatsGrid from './PaymentControlStatsGrid';
import SubscriptionDetailsModal from './SubscriptionDetailsModal';
import SubscriptionTable from './SubscriptionTable';
import TableTabSwitch, { type TableTab } from './TableTabSwitch';
import type { ArtistSubscription, SubscriptionEditValues } from './types';

type TableTabKey = 'subscription' | 'invoices';

const TABLE_TABS: TableTab<TableTabKey>[] = [
  { key: 'subscription', label: 'Subscription' },
  { key: 'invoices', label: 'Invoices' },
];

export default function PaymentControlContainer() {
  const [tab, setTab] = useTabsQueryState<TableTabKey>('tab', 'subscription');
  const [query, setQuery] = useState('');
  const [subscriptions, setSubscriptions] = useState<ArtistSubscription[]>(MOCK_SUBSCRIPTIONS);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);

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

  const handleSaveSubscription = (id: string, values: SubscriptionEditValues) => {
    setSubscriptions(prev =>
      prev.map(subscription =>
        subscription.id === id
          ? {
            ...subscription,
            plan: values.plan,
            status: values.status,
            billingCycle: values.billingCycle,
            amount: Number(values.amount) || 0,
            releasesUsed: Number(values.releasesUsed) || 0,
          }
          : subscription,
      ),
    );
    setEditingId(null);
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
          <SubscriptionTable
            subscriptions={filteredSubscriptions}
            onViewDetails={setViewingId}
            onEditPlan={setEditingId}
          />
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
      />

      <CreateInvoiceModal
        isOpen={createInvoiceOpen}
        onClose={() => setCreateInvoiceOpen(false)}
        onCreate={() => setCreateInvoiceOpen(false)}
      />
    </div>
  );
}


export type DocumentItem = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  tag: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  dateTime: string;
  completed: boolean;
  actionLabel?: string;
  actionDisabled?: boolean;
};

export const RATE_CONFIRMATION_DOC: DocumentItem = {
  id: 'rate-confirmation',
  name: 'Rate Confirmation.pdf',
  size: '0.7 MB',
  uploadedAt: 'Mar 23, 2026, 09:06 PM',
  tag: 'Rate Confirmation',
};

export const DRIVER_DOCS: DocumentItem[] = [
  {
    id: 'pod',
    name: 'POD - Proof of Delivery.pdf',
    size: '0.7 MB',
    uploadedAt: 'Mar 23, 2026, 09:06 PM',
    tag: 'POD',
  },
  {
    id: 'bol',
    name: 'BOL - Bill of Lading.PDF',
    size: '0.7 MB',
    uploadedAt: 'Mar 23, 2026, 09:06 PM',
    tag: 'BOL',
  },
];

export const INITIAL_TIMELINE: TimelineItem[] = [
  {
    id: 'assigned',
    title: 'Assigned',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Done',
    actionDisabled: true,
  },
  {
    id: 'pickup',
    title: 'Pickup',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Done',
    actionDisabled: true,
  },
  {
    id: 'delivered',
    title: 'Delivered',
    dateTime: '12 Feb 2025 — 09:00',
    completed: true,
    actionLabel: 'Mark Done',
    actionDisabled: false,
  },
  {
    id: 'completed',
    title: 'Completed',
    dateTime: '12 Feb 2025 — 09:00',
    completed: false,
    actionLabel: 'Done',
    actionDisabled: true,
  },
];

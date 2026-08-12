'use client';

import { useRef, useState } from 'react';
import { CheckCircle2, Eye, Pencil, Trash2 } from 'lucide-react';
import { Dropdown } from '@/src/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/src/components/ui/dropdown/DropdownItem';

const MENU_ITEM_CLASSNAME =
  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#344054] hover:bg-[#F5F7FB]';

type InvoiceActionsMenuProps = {
  isPaid: boolean;
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMarkAsPaid: () => void;
};

export default function InvoiceActionsMenu({
  isPaid,
  onViewDetails,
  onEdit,
  onDelete,
  onMarkAsPaid,
}: InvoiceActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(current => !current)}
        className="dropdown-toggle inline-flex items-center gap-1 rounded-lg border border-[#D0D5DD] px-3 py-1.5 text-xs font-medium text-[#344054] hover:bg-[#F9FAFB]"
      >
        Actions →
      </button>

      <Dropdown
        isOpen={open}
        onClose={() => setOpen(false)}
        anchorRef={triggerRef}
        align="end"
        className="w-48 p-1"
      >
        <DropdownItem
          baseClassName={MENU_ITEM_CLASSNAME}
          onItemClick={() => {
            setOpen(false);
            onViewDetails();
          }}
        >
          <Eye size={14} /> View Details
        </DropdownItem>

        <DropdownItem
          baseClassName={MENU_ITEM_CLASSNAME}
          onItemClick={() => {
            setOpen(false);
            onEdit();
          }}
        >
          <Pencil size={14} /> Edit Invoice
        </DropdownItem>

        {!isPaid && (
          <DropdownItem
            baseClassName={MENU_ITEM_CLASSNAME}
            onItemClick={() => {
              setOpen(false);
              onMarkAsPaid();
            }}
          >
            <CheckCircle2 size={14} /> Mark as Paid
          </DropdownItem>
        )}

        <DropdownItem
          baseClassName={`${MENU_ITEM_CLASSNAME} text-[#DC2626] hover:bg-[#FEF2F2]`}
          onItemClick={() => {
            setOpen(false);
            onDelete();
          }}
        >
          <Trash2 size={14} /> Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
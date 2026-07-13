'use client';

import { useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import { Dropdown } from '@/src/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/src/components/ui/dropdown/DropdownItem';

const MENU_ITEM_CLASSNAME =
  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#344054] hover:bg-[#F5F7FB]';

type ReviewActionsMenuProps = {
  onViewDetails: () => void;
  onEditPlan: () => void;
};

export default function ReviewActionsMenu({ onViewDetails, onEditPlan }: ReviewActionsMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        className="dropdown-toggle inline-flex items-center gap-1 rounded-lg border border-[#D0D5DD] px-3 py-1.5 text-xs font-medium text-[#344054] hover:bg-[#F9FAFB]"
      >
        Review →
      </button>

      <Dropdown isOpen={open} onClose={() => setOpen(false)} className="w-44 p-1">
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
            onEditPlan();
          }}
        >
          <Pencil size={14} /> Edit Plan
        </DropdownItem>
      </Dropdown>
    </div>
  );
}

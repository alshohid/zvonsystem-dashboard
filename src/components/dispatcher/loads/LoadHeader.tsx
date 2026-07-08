'use client';

import { EditOptionIcon } from '@/src/icons';
import { Pencil } from 'lucide-react';

type Props = {
  title: string;
  showEdit?: boolean;
  onEdit?: () => void;
  rightAction?: React.ReactNode;
};

export default function LoadHeader({
  title,
  showEdit,
  onEdit,
  rightAction,
}: Props) {
  return (
    <div className="flex justify-between items-start mb-4">
      <h1 className="text-[28px] font-bold text-[#111827]">{title}</h1>

      {rightAction ? (
        rightAction
      ) : showEdit ? (
        <button
          onClick={onEdit}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <EditOptionIcon/>
        </button>
      ) : null}
    </div>
  );
}

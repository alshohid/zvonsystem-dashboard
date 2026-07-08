'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
 
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-8 w-8 rounded-lg border border-[#E1E6EF] flex items-center justify-center text-[#6E778A] disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-8 min-w-8 rounded-lg border px-3 text-sm transition ${
            currentPage === page
              ? 'bg-[#313E8C] border-[#313E8C] text-white'
              : 'border-[#E1E6EF] text-[#6E778A] hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-8 w-8 rounded-lg border border-[#E1E6EF] flex items-center justify-center text-[#6E778A] disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

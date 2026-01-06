import { useState, useCallback } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export function Pagination({
  totalItems,
  itemsPerPage = 25,
  currentPage = 1,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);

  const totalPages = Math.ceil(totalItems / localItemsPerPage);
  const startItem = (localCurrentPage - 1) * localItemsPerPage + 1;
  const endItem = Math.min(localCurrentPage * localItemsPerPage, totalItems);

  const handleItemsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = parseInt(e.target.value, 10);
      setLocalItemsPerPage(newValue);
      setLocalCurrentPage(1);
      onItemsPerPageChange?.(newValue);
    },
    [onItemsPerPageChange]
  );

  const handlePrevPage = useCallback(() => {
    if (localCurrentPage > 1) {
      const newPage = localCurrentPage - 1;
      setLocalCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [localCurrentPage, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (localCurrentPage < totalPages) {
      const newPage = localCurrentPage + 1;
      setLocalCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [localCurrentPage, totalPages, onPageChange]);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* Items per page */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <span>Items per page:</span>
        <select
          value={localItemsPerPage}
          onChange={handleItemsPerPageChange}
          className="border border-[var(--border)] rounded px-2 py-1 text-sm text-[var(--text-primary)] bg-white focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Page info and navigation */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--text-secondary)]">
          {startItem} - {endItem} of {totalItems}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevPage}
            disabled={localCurrentPage === 1}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNextPage}
            disabled={localCurrentPage === totalPages}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback } from 'react';
import { FolderItem } from '../types';
import { PermissionBadge } from './PermissionBadge';

interface FolderTableProps {
  items: FolderItem[];
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleDateString('en-US', options);
}

export function FolderTable({ items }: FolderTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((item) => item.id)));
    }
  }, [items, selectedIds.size]);

  const handleSelectItem = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isAllSelected = selectedIds.size === items.length && items.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--border)]">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-slate-300 text-[var(--accent)] focus:ring-[var(--accent)]"
              />
            </th>
            <th className="w-10 px-2 py-3"></th>
            <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Title</th>
            <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Size</th>
            <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Last Modified</th>
            <th className="text-left px-4 py-3 text-sm font-medium text-[var(--text-secondary)]">Permission</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isSelected = selectedIds.has(item.id);
            return (
              <tr
                key={item.id}
                className={`border-b border-[var(--border)] transition-colors ${
                  isSelected ? 'bg-[var(--accent-light)]' : 'hover:bg-slate-50'
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 rounded border-slate-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                </td>
                <td className="px-2 py-3">
                  <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-primary)]">
                  <span className="truncate block max-w-md">{item.title}</span>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{item.size || ''}</td>
                <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {formatDate(item.lastModified)}
                  {item.modifiedBy && (
                    <span className="text-[var(--text-secondary)]"> by {item.modifiedBy}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <PermissionBadge permission={item.permission} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

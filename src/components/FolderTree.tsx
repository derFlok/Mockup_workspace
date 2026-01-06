import { useState, useCallback } from 'react';
import { FolderNode } from '../types';

interface FolderTreeProps {
  node: FolderNode;
  level?: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function FolderTree({ node, level = 0, selectedId, onSelect }: FolderTreeProps) {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded ?? false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;
  const isRoot = level === 0;

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  const handleSelect = useCallback(() => {
    onSelect?.(node.id);
  }, [node.id, onSelect]);

  return (
    <div className={isRoot ? '' : 'relative'}>
      {/* Vertical connecting line */}
      {!isRoot && (
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-violet-200"
          style={{ left: `${(level - 1) * 12 + 20}px` }}
        />
      )}

      <div
        onClick={handleSelect}
        className={`w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer transition-colors group ${
          isSelected
            ? 'bg-teal-50 text-teal-700'
            : 'hover:bg-slate-100 text-[var(--text-primary)]'
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {/* Expand/collapse arrow - show on all items */}
        <span
          onClick={handleToggle}
          className="w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded flex-shrink-0"
        >
          {isExpanded && hasChildren ? (
            <svg className="w-3 h-3 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </span>

        {/* Folder icon - blue/purple */}
        <svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>

        {/* Folder name */}
        <span className="text-sm truncate flex-1">{node.name}</span>

        {/* Three dots menu - show on hover */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-slate-200 rounded transition-opacity flex-shrink-0"
        >
          <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="relative">
          {node.children!.map((child) => (
            <FolderTree
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

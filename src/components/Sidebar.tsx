import { useState, useCallback } from 'react';
import { SidebarSection } from './SidebarSection';
import { FolderTree } from './FolderTree';
import { FolderNode } from '../types';

interface SidebarProps {
  folderTree: FolderNode;
  onSearchClick?: () => void;
  onHomeClick?: () => void;
  isSearchActive?: boolean;
}

interface NavItemProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ label, isActive = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
          : 'text-[var(--text-primary)] hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );
}

export function Sidebar({ folderTree, onSearchClick, onHomeClick, isSearchActive }: SidebarProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string>('home');

  const handleFolderSelect = useCallback((id: string) => {
    setSelectedFolderId(id);
    onHomeClick?.();
  }, [onHomeClick]);

  return (
    <aside className="w-52 bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col flex-shrink-0 overflow-hidden">
      {/* Repository Search */}
      <button
        onClick={onSearchClick}
        className={`flex items-center gap-2 px-3 py-3 text-sm transition-colors ${
          isSearchActive
            ? 'bg-[var(--accent-light)] text-[var(--accent)]'
            : 'text-[var(--text-primary)] hover:bg-slate-100'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Repository Search
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Process Management */}
        <SidebarSection title="Process Management">
          <div className="space-y-0.5">
            <div className="px-4 py-1">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Tasks</span>
            </div>
            <NavItem label="My Tasks" />
            <NavItem label="Queued Tasks" />
            <NavItem label="Completed Tasks" />

            <div className="px-4 py-1 pt-3">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Processes</span>
            </div>
            <NavItem label="Running" />
            <NavItem label="Completed" />
            <NavItem label="All" />
          </div>
        </SidebarSection>

        {/* Content Management */}
        <SidebarSection title="Content Management">
          <FolderTree
            node={folderTree}
            selectedId={selectedFolderId}
            onSelect={handleFolderSelect}
          />
        </SidebarSection>
      </div>
    </aside>
  );
}

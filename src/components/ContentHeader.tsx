import { DropdownMenu, DropdownItem } from './DropdownMenu';

interface ContentHeaderProps {
  title: string;
}

export function ContentHeader({ title }: ContentHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>

      <DropdownMenu
        trigger={
          <button className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors">
            <span className="text-sm font-medium">File Upload</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        }
      >
        <DropdownItem
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          }
          label="Upload file"
        />
        <DropdownItem
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          }
          label="Create Folder"
        />
      </DropdownMenu>
    </div>
  );
}

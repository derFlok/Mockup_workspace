import { useState, useCallback, ReactNode } from 'react';

interface SidebarSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: ReactNode;
}

export function SidebarSection({ title, defaultExpanded = true, children }: SidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 transition-colors"
      >
        <span className="text-sm font-semibold text-[var(--text-primary)]">{title}</span>
        <svg
          className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${
            isExpanded ? 'rotate-0' : '-rotate-90'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && <div className="pb-2">{children}</div>}
    </div>
  );
}

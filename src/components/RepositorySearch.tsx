import { useState, useCallback } from 'react';

type SearchTab = 'text' | 'hxql';

export function RepositorySearch() {
  const [activeTab, setActiveTab] = useState<SearchTab>('text');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = useCallback((tab: SearchTab) => {
    setActiveTab(tab);
  }, []);

  const handleReset = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-secondary)]">
      {/* Tabs */}
      <div className="border-b border-[var(--border)] px-6">
        <div className="flex gap-6">
          <button
            onClick={() => handleTabChange('text')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'text'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Text search
          </button>
          <button
            onClick={() => handleTabChange('hxql')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'hxql'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            HxQL search
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-6 py-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type your text to search"
          className="w-full px-4 py-3 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      {/* Filters and Actions Row */}
      <div className="px-6 pb-4 flex items-center justify-between">
        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <FilterDropdown label="Search In" />
          <FilterDropdown label="File Type" />
          <FilterDropdown label="Created Date" />
          <FilterDropdown label="Content Type" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Reset
          </button>
          <button className="px-4 py-2 text-sm font-medium border border-[var(--border)] rounded-lg hover:bg-slate-50 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">
          No search results
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Oops, seems like no results are found for your search.
        </p>
      </div>
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
}

function FilterDropdown({ label }: FilterDropdownProps) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-[var(--border)] rounded-lg hover:bg-slate-50 transition-colors">
      <span className="text-[var(--text-primary)]">{label}</span>
      <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

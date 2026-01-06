import { useState, useCallback } from 'react';
import { IconBar } from './components/IconBar';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ContentHeader } from './components/ContentHeader';
import { FolderTable } from './components/FolderTable';
import { Pagination } from './components/Pagination';
import { RepositorySearch } from './components/RepositorySearch';
import { iconUsers, sidebarFolders, folderItems, totalItems } from './data/mockData';

type ViewType = 'home' | 'search';

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleSearchClick = useCallback(() => {
    setCurrentView('search');
  }, []);

  const handleHomeClick = useCallback(() => {
    setCurrentView('home');
  }, []);

  return (
    <div className="h-screen flex bg-[var(--bg-primary)]">
      {/* Icon Bar - full height */}
      <IconBar users={iconUsers} />

      {/* Right side with header + content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Header onHomeClick={handleHomeClick} />

        {/* Main content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            folderTree={sidebarFolders}
            onSearchClick={handleSearchClick}
            onHomeClick={handleHomeClick}
            isSearchActive={currentView === 'search'}
          />

          {/* Main Content */}
          {currentView === 'search' ? (
            <RepositorySearch />
          ) : (
            <main className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-secondary)]">
              {/* Content Header */}
              <ContentHeader title="Home" />

              {/* Table */}
              <div className="flex-1 overflow-auto">
                <FolderTable items={folderItems} />
              </div>

              {/* Pagination */}
              <Pagination totalItems={totalItems} itemsPerPage={25} />
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

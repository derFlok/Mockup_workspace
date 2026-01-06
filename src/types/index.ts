export interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
  isExpanded?: boolean;
}

export interface FolderItem {
  id: string;
  title: string;
  size?: string;
  lastModified: Date;
  modifiedBy?: string;
  permission: 'Everything' | 'Read' | 'Write';
}

export interface IconUser {
  id: string;
  initials: string;
  color: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

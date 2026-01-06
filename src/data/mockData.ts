import { FolderItem, FolderNode, IconUser } from '../types';

// Generate random hash-like string
function generateHash(): string {
  const chars = 'abcdef0123456789';
  let hash = '';
  for (let i = 0; i < 8; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

// Generate folder name based on date
function generateFolderName(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  const secs = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${mins}-${secs}_${generateHash()}-11f0-...`;
}

// Icon bar users
export const iconUsers: IconUser[] = [
  { id: '1', initials: 'AB', color: '#7c3aed' },
  { id: '2', initials: 'CR', color: '#059669' },
  { id: '3', initials: 'CI', color: '#0891b2' },
  { id: '4', initials: 'FC', color: '#7c3aed' },
  { id: '5', initials: 'KD', color: '#dc2626' },
  { id: '6', initials: 'NC', color: '#0891b2' },
  { id: '7', initials: 'NK', color: '#7c3aed' },
  { id: '8', initials: 'TS', color: '#059669' },
  { id: '9', initials: 'FK', color: '#7c3aed' },
];

// Sidebar folder tree
export const sidebarFolders: FolderNode = {
  id: 'home',
  name: 'Home',
  isExpanded: true,
  children: [
    { id: 'f1', name: '2025-07-07_12-43-...' },
    { id: 'f2', name: '2025-07-08_10-39-...' },
    { id: 'f3', name: '2025-07-08_10-42-...' },
    { id: 'f4', name: '2025-07-08_10-47-...' },
    { id: 'f5', name: '2025-07-22_08-07-...' },
    { id: 'f6', name: '2025-07-23_10-44-...' },
    { id: 'f7', name: '2025-07-23_10-53-...' },
    { id: 'f8', name: '2025-07-23_11-01-...' },
    { id: 'f9', name: '2025-07-23_11-23-...' },
    { id: 'f10', name: '2025-07-23_11-24-...' },
    { id: 'f11', name: '2025-07-24_07-38-...' },
    { id: 'f12', name: '2025-07-24_12-19-...' },
    { id: 'f13', name: '2025-07-30_16-05-...' },
    { id: 'f14', name: '2025-09-10_10-08-...' },
    { id: 'f15', name: '2025-09-10_12-26-...' },
  ],
};

// Generate table data
export const folderItems: FolderItem[] = [
  {
    id: '1',
    title: generateFolderName(new Date('2025-07-07T12:43:16')),
    lastModified: new Date('2025-07-07T14:43:00'),
    permission: 'Everything',
  },
  {
    id: '3',
    title: generateFolderName(new Date('2025-07-08T10:39:18')),
    lastModified: new Date('2025-07-08T12:39:00'),
    permission: 'Everything',
  },
  {
    id: '4',
    title: generateFolderName(new Date('2025-07-08T10:42:19')),
    lastModified: new Date('2025-07-08T12:42:00'),
    permission: 'Everything',
  },
  {
    id: '5',
    title: generateFolderName(new Date('2025-07-08T10:47:29')),
    lastModified: new Date('2025-07-08T12:47:00'),
    permission: 'Everything',
  },
  {
    id: '6',
    title: generateFolderName(new Date('2025-07-22T08:07:57')),
    lastModified: new Date('2025-07-22T10:07:00'),
    permission: 'Everything',
  },
  {
    id: '7',
    title: generateFolderName(new Date('2025-07-23T10:44:46')),
    lastModified: new Date('2025-07-23T12:44:00'),
    permission: 'Everything',
  },
  {
    id: '8',
    title: generateFolderName(new Date('2025-07-23T10:53:09')),
    lastModified: new Date('2025-07-23T12:53:00'),
    permission: 'Everything',
  },
  {
    id: '9',
    title: generateFolderName(new Date('2025-07-23T11:01:44')),
    lastModified: new Date('2025-07-23T13:01:00'),
    permission: 'Everything',
  },
  {
    id: '10',
    title: generateFolderName(new Date('2025-07-23T11:23:45')),
    lastModified: new Date('2025-07-23T13:23:00'),
    permission: 'Everything',
  },
  {
    id: '11',
    title: generateFolderName(new Date('2025-07-23T11:24:24')),
    lastModified: new Date('2025-07-23T13:24:00'),
    permission: 'Everything',
  },
  {
    id: '12',
    title: generateFolderName(new Date('2025-07-24T07:38:39')),
    lastModified: new Date('2025-07-24T09:38:00'),
    permission: 'Everything',
  },
  {
    id: '13',
    title: generateFolderName(new Date('2025-07-24T12:19:36')),
    lastModified: new Date('2025-07-24T14:19:00'),
    permission: 'Everything',
  },
  {
    id: '14',
    title: generateFolderName(new Date('2025-07-30T16:05:39')),
    lastModified: new Date('2025-07-30T18:05:00'),
    permission: 'Everything',
  },
  {
    id: '15',
    title: generateFolderName(new Date('2025-09-10T10:08:09')),
    lastModified: new Date('2025-09-10T12:08:00'),
    permission: 'Everything',
  },
  {
    id: '16',
    title: generateFolderName(new Date('2025-09-10T12:26:27')),
    lastModified: new Date('2025-09-10T14:26:00'),
    permission: 'Everything',
  },
  {
    id: '17',
    title: generateFolderName(new Date('2025-09-10T12:38:06')),
    lastModified: new Date('2025-09-10T14:38:00'),
    permission: 'Everything',
  },
  {
    id: '18',
    title: generateFolderName(new Date('2025-09-10T12:42:50')),
    lastModified: new Date('2025-09-10T14:42:00'),
    permission: 'Everything',
  },
  {
    id: '19',
    title: generateFolderName(new Date('2025-09-10T16:19:53')),
    lastModified: new Date('2025-09-10T18:19:00'),
    permission: 'Everything',
  },
  {
    id: '20',
    title: generateFolderName(new Date('2025-09-11T08:15:22')),
    lastModified: new Date('2025-09-11T10:15:00'),
    permission: 'Everything',
  },
  {
    id: '21',
    title: generateFolderName(new Date('2025-09-11T09:33:47')),
    lastModified: new Date('2025-09-11T11:33:00'),
    permission: 'Everything',
  },
  {
    id: '22',
    title: generateFolderName(new Date('2025-09-12T14:22:18')),
    lastModified: new Date('2025-09-12T16:22:00'),
    permission: 'Everything',
  },
  {
    id: '23',
    title: generateFolderName(new Date('2025-09-13T11:45:33')),
    lastModified: new Date('2025-09-13T13:45:00'),
    permission: 'Everything',
  },
  {
    id: '24',
    title: generateFolderName(new Date('2025-09-14T16:08:59')),
    lastModified: new Date('2025-09-14T18:08:00'),
    permission: 'Everything',
  },
  {
    id: '25',
    title: generateFolderName(new Date('2025-09-15T09:27:14')),
    lastModified: new Date('2025-09-15T11:27:00'),
    permission: 'Everything',
  },
];

// Total items for pagination
export const totalItems = 463;

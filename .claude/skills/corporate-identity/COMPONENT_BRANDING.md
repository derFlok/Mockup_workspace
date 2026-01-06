# Component Branding Locations

This document details every component that contains branding elements and exactly where to make changes.

## 1. Header Component

**File:** `/src/components/Header.tsx`

### Logo / Brand Name (Lines 19-22)

```tsx
{/* Hyland Logo on right */}
<div className="flex items-center gap-3">
  <span className="text-lg font-bold tracking-wider text-[var(--text-primary)]">
    HYLAND<sup className="text-[10px] font-normal ml-0.5">TM</sup>
  </span>
```

**To change to text logo:**

```tsx
<span className="text-lg font-bold tracking-wider text-[var(--text-primary)]">
  YOUR COMPANY NAME
</span>
```

**To change to image logo:**

```tsx
<img
  src="/logo.svg"
  alt="Company Logo"
  className="h-8"
/>
```

### Workspace Title (Line 14)

```tsx
<button
  onClick={onHomeClick}
  className="text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
>
  Workspace
</button>
```

**Change "Workspace" if needed** (e.g., "Dashboard", "Portal")

## 2. Application HTML

**File:** `/index.html`

### Page Title (Line 7)

```html
<title>Hyland Workspace</title>
```

**Change to:**

```html
<title>Your Company Workspace</title>
```

### Favicon (Line 5)

```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

**Change to:**

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<!-- Or for PNG/ICO -->
<link rel="icon" type="image/png" href="/favicon.png" />
```

## 3. FolderTree Component

**File:** `/src/components/FolderTree.tsx`

### Connecting Line Color (Line 31)

```tsx
<div
  className="absolute left-0 top-0 bottom-0 w-px bg-violet-200"
  style={{ left: `${(level - 1) * 12 + 20}px` }}
/>
```

**Change `bg-violet-200` to use CSS variable:**

```tsx
<div
  className="absolute left-0 top-0 bottom-0 w-px bg-[var(--accent-light)]"
  style={{ left: `${(level - 1) * 12 + 20}px` }}
/>
```

### Selected Folder State (Line 38-41)

```tsx
className={`w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer transition-colors group ${
  isSelected
    ? 'bg-teal-50 text-teal-700'
    : 'hover:bg-slate-100 text-[var(--text-primary)]'
}`}
```

**Change to use CSS variables:**

```tsx
className={`w-full flex items-center gap-1.5 px-2 py-1.5 cursor-pointer transition-colors group ${
  isSelected
    ? 'bg-[var(--accent-light)] text-[var(--accent)]'
    : 'hover:bg-slate-100 text-[var(--text-primary)]'
}`}
```

### Folder Icon Color (Line 62)

```tsx
<svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
```

**Change to:**

```tsx
<svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
```

## 4. FolderTable Component

**File:** `/src/components/FolderTable.tsx`

### Folder Icon in Table (Around Line 85)

Look for:

```tsx
<svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
```

**Change to:**

```tsx
<svg className="w-4 h-4 text-[var(--folder-icon)]" fill="currentColor" viewBox="0 0 20 20">
```

### Selected Row Background

Look for uses of `--accent-light` - these should already be using CSS variables.

### Checkbox Accent

Look for checkbox styling using `--accent` - these should already be using CSS variables.

## 5. ContentHeader Component

**File:** `/src/components/ContentHeader.tsx`

### Primary Action Button (Lines 13-20)

```tsx
<button className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors">
```

**Already uses CSS variables** - no changes needed.

## 6. Sidebar Component

**File:** `/src/components/Sidebar.tsx`

### Active Navigation Item (Lines 25-26)

```tsx
isActive
  ? 'bg-[var(--accent-light)] text-[var(--accent)] font-medium'
  : 'text-[var(--text-primary)] hover:bg-slate-100'
```

**Already uses CSS variables** - no changes needed for colors.

**Optional:** Change `hover:bg-slate-100` to a variable if you want themed hover states.

## 7. IconBar Component

**File:** `/src/components/IconBar.tsx`

### Background Color

Uses `--bg-iconbar` CSS variable - **already themed**.

### Icon Colors

Icons use `text-white` class which works on the dark background.

## 8. PermissionBadge Component

**File:** `/src/components/PermissionBadge.tsx`

### Badge Styling

Look for uses of `--badge-teal` - **already uses CSS variables**.

## 9. RepositorySearch Component

**File:** `/src/components/RepositorySearch.tsx`

### Active Tab Styling

Look for uses of `--accent` for tab borders and text - **already uses CSS variables**.

## 10. Pagination Component

**File:** `/src/components/Pagination.tsx`

### Focus Ring Color

Look for focus styling using `--accent` - **already uses CSS variables**.

## 11. Mock Data

**File:** `/src/data/mockData.ts`

### User Avatar Colors (Lines 25-35)

```typescript
export const iconUsers: IconUser[] = [
  { id: '1', initials: 'AB', color: '#7c3aed' },
  { id: '2', initials: 'CR', color: '#059669' },
  { id: '3', initials: 'FC', color: '#7c3aed' },
  { id: '4', initials: 'CI', color: '#0891b2' },
  { id: '5', initials: 'NK', color: '#7c3aed' },
  { id: '6', initials: 'TS', color: '#059669' },
  { id: '7', initials: 'KD', color: '#dc2626' },
  { id: '8', initials: 'NC', color: '#0891b2' },
  { id: '9', initials: 'FK', color: '#7c3aed' },
];
```

**Update colors to match your brand palette:**

```typescript
export const iconUsers: IconUser[] = [
  { id: '1', initials: 'AB', color: '#3B82F6' }, // primary blue
  { id: '2', initials: 'CR', color: '#10B981' }, // secondary green
  { id: '3', initials: 'FC', color: '#3B82F6' }, // primary blue
  // ... etc
];
```

## Summary: Files to Modify

| Priority | File | Changes Needed |
|----------|------|----------------|
| HIGH | `src/index.css` | Update CSS variables |
| HIGH | `src/components/Header.tsx` | Logo text/image |
| HIGH | `index.html` | Title and favicon |
| MEDIUM | `src/components/FolderTree.tsx` | Replace hardcoded colors |
| MEDIUM | `src/components/FolderTable.tsx` | Replace hardcoded folder icon color |
| LOW | `src/data/mockData.ts` | Avatar colors (optional) |

## Components Already Themed (No Changes Needed)

These components already use CSS variables and will automatically update:

- `ContentHeader.tsx`
- `Sidebar.tsx` (mostly)
- `IconBar.tsx`
- `PermissionBadge.tsx`
- `RepositorySearch.tsx`
- `Pagination.tsx`

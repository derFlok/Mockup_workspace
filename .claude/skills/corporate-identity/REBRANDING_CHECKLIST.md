# Rebranding Checklist

Follow this step-by-step checklist to rebrand the CIC Mockup Workspace.

## Prerequisites

Before starting, gather:

- [ ] Company name (full and abbreviated versions)
- [ ] Primary brand color (hex code, e.g., `#3B82F6`)
- [ ] Secondary/accent color (hex code, or "auto-generate")
- [ ] Logo file (if using image) - SVG preferred
- [ ] Favicon file (optional) - ICO, PNG, or SVG

## Phase 1: Update CSS Variables

**File:** `/src/index.css`

### Step 1.1: Update Accent Colors

Find the `:root` block and update these variables:

```css
:root {
  /* Update these with your brand colors */
  --accent: #YOUR_PRIMARY_COLOR;
  --accent-hover: #YOUR_DARKER_SHADE;
  --accent-light: #YOUR_LIGHTER_SHADE;
  --folder-icon: #YOUR_MEDIUM_SHADE;
}
```

**Color calculation guide:**
- `--accent`: Your primary brand color
- `--accent-hover`: 10-15% darker than primary
- `--accent-light`: 80-90% lighter than primary (very light tint)
- `--folder-icon`: Similar to primary, slightly lighter

### Step 1.2: Update Badge Colors (Optional)

If you want different badge colors:

```css
:root {
  --badge-teal: #YOUR_BADGE_COLOR;
  --badge-teal-bg: #YOUR_BADGE_BG_COLOR;
}
```

### Step 1.3: Update Icon Bar (Optional)

If you want a different dark sidebar color:

```css
:root {
  --bg-iconbar: #YOUR_DARK_COLOR;
}
```

### Step 1.4: Update Scrollbar Colors

Find the scrollbar styles (around line 44-50) and update:

```css
::-webkit-scrollbar-thumb {
  background: #YOUR_SCROLLBAR_COLOR;  /* Match --border or similar */
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #YOUR_SCROLLBAR_HOVER;  /* Slightly darker */
}
```

### Step 1.5: Add Dark Mode (If Requested)

Add after the `:root` block:

```css
.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-sidebar: #1e293b;
  --bg-iconbar: #020617;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #YOUR_LIGHT_ACCENT;        /* Lighter for dark backgrounds */
  --accent-hover: #YOUR_LIGHTER_ACCENT;
  --accent-light: #YOUR_DARK_ACCENT_BG;
  --badge-teal: #YOUR_LIGHT_BADGE;
  --badge-teal-bg: #YOUR_DARK_BADGE_BG;
  --border: #334155;
  --folder-icon: #YOUR_LIGHT_FOLDER;
}
```

## Phase 2: Update Hardcoded Tailwind Colors

### Step 2.1: FolderTree Component

**File:** `/src/components/FolderTree.tsx`

**Line 31 - Connecting line:**

Change:
```tsx
className="absolute left-0 top-0 bottom-0 w-px bg-violet-200"
```

To:
```tsx
className="absolute left-0 top-0 bottom-0 w-px bg-[var(--accent-light)]"
```

**Line 40 - Selected state:**

Change:
```tsx
? 'bg-teal-50 text-teal-700'
```

To:
```tsx
? 'bg-[var(--accent-light)] text-[var(--accent)]'
```

**Line 62 - Folder icon:**

Change:
```tsx
className="w-4 h-4 text-violet-500 flex-shrink-0"
```

To:
```tsx
className="w-4 h-4 text-[var(--accent)] flex-shrink-0"
```

### Step 2.2: FolderTable Component

**File:** `/src/components/FolderTable.tsx`

Find folder icon styling (search for `text-violet-400`):

Change:
```tsx
className="w-4 h-4 text-violet-400"
```

To:
```tsx
className="w-4 h-4 text-[var(--folder-icon)]"
```

## Phase 3: Update Logo and Brand Text

### Step 3.1: Header Logo

**File:** `/src/components/Header.tsx`

**For text-based logo (Lines 19-22):**

Change:
```tsx
<span className="text-lg font-bold tracking-wider text-[var(--text-primary)]">
  HYLAND<sup className="text-[10px] font-normal ml-0.5">TM</sup>
</span>
```

To:
```tsx
<span className="text-lg font-bold tracking-wider text-[var(--text-primary)]">
  YOUR COMPANY NAME
</span>
```

**For image logo:**

Replace the entire `<span>` with:
```tsx
<img
  src="/logo.svg"
  alt="Company Logo"
  className="h-8"
/>
```

And add your logo file to `/public/logo.svg`

## Phase 4: Update HTML Meta

**File:** `/index.html`

### Step 4.1: Page Title (Line 7)

Change:
```html
<title>Hyland Workspace</title>
```

To:
```html
<title>Your Company Workspace</title>
```

### Step 4.2: Favicon (Line 5)

Change:
```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

To:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

And add your favicon file to `/public/favicon.svg`

## Phase 5: Update Avatar Colors (Optional)

**File:** `/src/data/mockData.ts`

Update the `iconUsers` array colors to match your brand:

```typescript
export const iconUsers: IconUser[] = [
  { id: '1', initials: 'AB', color: '#YOUR_COLOR_1' },
  { id: '2', initials: 'CR', color: '#YOUR_COLOR_2' },
  { id: '3', initials: 'FC', color: '#YOUR_COLOR_1' },
  // ... update remaining users
];
```

## Phase 6: Verification

### Step 6.1: Start Development Server

```bash
npm run dev
```

### Step 6.2: Visual Inspection Checklist

- [ ] Header logo displays correctly
- [ ] Page title shows in browser tab
- [ ] Favicon displays in browser tab
- [ ] Primary buttons use correct color
- [ ] Hover states work correctly
- [ ] Selected items use correct highlight color
- [ ] Folder icons use correct color
- [ ] Sidebar active states look correct
- [ ] Permission badges display correctly
- [ ] Scrollbars match the theme

### Step 6.3: Dark Mode Check (If Implemented)

- [ ] Add `.dark` class to `<html>` element
- [ ] Verify all colors invert correctly
- [ ] Check text is readable on dark backgrounds
- [ ] Verify accent colors are visible

### Step 6.4: Build Verification

```bash
npm run build
```

Ensure no build errors.

## Quick Copy-Paste Templates

### Blue Brand Example

```css
/* src/index.css - :root section */
--accent: #3B82F6;
--accent-hover: #2563EB;
--accent-light: #DBEAFE;
--folder-icon: #60A5FA;
```

### Green Brand Example

```css
/* src/index.css - :root section */
--accent: #10B981;
--accent-hover: #059669;
--accent-light: #D1FAE5;
--folder-icon: #34D399;
```

### Red Brand Example

```css
/* src/index.css - :root section */
--accent: #EF4444;
--accent-hover: #DC2626;
--accent-light: #FEE2E2;
--folder-icon: #F87171;
```

### Orange Brand Example

```css
/* src/index.css - :root section */
--accent: #F97316;
--accent-hover: #EA580C;
--accent-light: #FFEDD5;
--folder-icon: #FB923C;
```

## Rollback

If you need to revert changes:

```bash
git checkout -- src/index.css
git checkout -- src/components/Header.tsx
git checkout -- src/components/FolderTree.tsx
git checkout -- src/components/FolderTable.tsx
git checkout -- index.html
git checkout -- src/data/mockData.ts
```

Or restore from the original values documented in [CSS_VARIABLES.md](CSS_VARIABLES.md).

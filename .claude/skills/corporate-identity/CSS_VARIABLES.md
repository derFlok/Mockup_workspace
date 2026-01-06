# CSS Variables Reference

All color definitions are centralized in `/src/index.css`. This makes rebranding straightforward - update the variables once, and all components inherit the new colors.

## Current Color System

### Location: `/src/index.css` (Lines 5-19)

```css
:root {
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-sidebar: #f8fafc;
  --bg-iconbar: #1e1b4b;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --accent-light: #ede9fe;
  --badge-teal: #14b8a6;
  --badge-teal-bg: #ccfbf1;
  --border: #e2e8f0;
  --folder-icon: #a78bfa;
}
```

## Variable Descriptions

### Background Colors

| Variable | Current Value | Description | Components Using It |
|----------|---------------|-------------|---------------------|
| `--bg-primary` | `#f8fafc` | Main page background (slate-50) | `body`, `App.tsx` container |
| `--bg-secondary` | `#ffffff` | Card/panel backgrounds (white) | `Header`, `ContentHeader`, `Pagination`, `RepositorySearch` |
| `--bg-sidebar` | `#f8fafc` | Sidebar background (slate-50) | `Sidebar.tsx` |
| `--bg-iconbar` | `#1e1b4b` | Vertical icon bar (indigo-950) | `IconBar.tsx` |

### Text Colors

| Variable | Current Value | Description | Components Using It |
|----------|---------------|-------------|---------------------|
| `--text-primary` | `#1e293b` | Primary text (slate-800) | All text content, headings |
| `--text-secondary` | `#64748b` | Secondary/muted text (slate-500) | Labels, timestamps, icons |

### Accent Colors (Primary Branding)

| Variable | Current Value | Description | Components Using It |
|----------|---------------|-------------|---------------------|
| `--accent` | `#7c3aed` | Primary accent (violet-600) | Buttons, focus rings, checkboxes, active states |
| `--accent-hover` | `#6d28d9` | Hover state (violet-700) | Button hover, link hover |
| `--accent-light` | `#ede9fe` | Light accent background (violet-100) | Selected items, active nav items |

### Badge & Icon Colors

| Variable | Current Value | Description | Components Using It |
|----------|---------------|-------------|---------------------|
| `--badge-teal` | `#14b8a6` | Badge accent (teal-500) | `PermissionBadge.tsx` border and text |
| `--badge-teal-bg` | `#ccfbf1` | Badge background (teal-100) | Reserved for badge backgrounds |
| `--folder-icon` | `#a78bfa` | Folder icon color (violet-400) | Reserved for folder icons |

### Border Color

| Variable | Current Value | Description | Components Using It |
|----------|---------------|-------------|---------------------|
| `--border` | `#e2e8f0` | Border/divider color (slate-200) | All borders, table dividers, separators |

## Hardcoded Colors (Require Manual Updates)

These colors are NOT using CSS variables and must be updated manually in their respective files.

### Scrollbar Colors

**Location:** `/src/index.css` (Lines 44-50)

```css
::-webkit-scrollbar-thumb {
  background: #cbd5e1;  /* slate-300 - UPDATE THIS */
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;  /* slate-400 - UPDATE THIS */
}
```

## Dark Mode Implementation

To add dark mode support, add a `.dark` class selector after `:root`:

```css
:root {
  /* Light mode variables (existing) */
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-sidebar: #f8fafc;
  --bg-iconbar: #1e1b4b;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --accent-light: #ede9fe;
  --badge-teal: #14b8a6;
  --badge-teal-bg: #ccfbf1;
  --border: #e2e8f0;
  --folder-icon: #a78bfa;
}

.dark {
  /* Dark mode overrides */
  --bg-primary: #0f172a;      /* slate-900 */
  --bg-secondary: #1e293b;    /* slate-800 */
  --bg-sidebar: #1e293b;      /* slate-800 */
  --bg-iconbar: #020617;      /* slate-950 */
  --text-primary: #f1f5f9;    /* slate-100 */
  --text-secondary: #94a3b8;  /* slate-400 */
  --accent: #a78bfa;          /* violet-400 (lighter for dark bg) */
  --accent-hover: #c4b5fd;    /* violet-300 */
  --accent-light: #4c1d95;    /* violet-900 (dark accent bg) */
  --badge-teal: #2dd4bf;      /* teal-400 */
  --badge-teal-bg: #134e4a;   /* teal-900 */
  --border: #334155;          /* slate-700 */
  --folder-icon: #c4b5fd;     /* violet-300 */
}
```

### Toggling Dark Mode

Add the `.dark` class to the `<html>` or `<body>` element:

```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Check current mode
const isDark = document.documentElement.classList.contains('dark');

// Persist preference
localStorage.setItem('theme', isDark ? 'dark' : 'light');

// Load preference on page load
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
```

## Color Transformation Guide

When rebranding, use these transformation rules:

| Light Mode Variable | Transformation for Dark Mode |
|---------------------|------------------------------|
| Background colors | Invert: light → dark shades |
| Text colors | Invert: dark → light shades |
| Accent colors | Keep same hue, adjust lightness up slightly |
| Accent light | Keep same hue, use very dark shade |
| Borders | Use darker shade (30-40% lightness) |

### Accessibility Requirements

Ensure color contrast meets WCAG AA standards:

- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text**: 3:1 minimum contrast ratio
- **UI components**: 3:1 minimum contrast ratio

Use a contrast checker: https://webaim.org/resources/contrastchecker/

## Example: Blue Brand Rebranding

Replace violet with blue:

```css
:root {
  /* ... other variables ... */
  --accent: #3B82F6;        /* blue-500 */
  --accent-hover: #2563EB;  /* blue-600 */
  --accent-light: #DBEAFE;  /* blue-100 */
  --folder-icon: #60A5FA;   /* blue-400 */
}

.dark {
  /* ... other variables ... */
  --accent: #60A5FA;        /* blue-400 */
  --accent-hover: #93C5FD;  /* blue-300 */
  --accent-light: #1E3A8A;  /* blue-900 */
  --folder-icon: #93C5FD;   /* blue-300 */
}
```

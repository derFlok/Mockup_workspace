---
name: corporate-identity
description: Rebrand the CIC Mockup Workspace with your company's visual identity. Guides you through updating colors, logo, application name, and all branding elements. Use when asked to change corporate identity, rebrand, update colors, or customize appearance.
---

# Corporate Identity Skill

Transform the CIC Mockup Workspace to match your company's brand identity in minutes.

## What This Skill Does

This skill provides an interactive rebranding experience that:

- Asks about your company's branding requirements
- Documents all locations where changes need to be made
- Guides you through updating colors, logos, and text
- Supports both light and dark mode theming
- Ensures consistent branding across all components

## Interactive Workflow

When this skill is invoked, ask the user the following questions:

### Question 1: Company Name

Ask: "What is your company name? This will replace 'HYLAND' throughout the app."

- Used in: Header logo, page title, any brand references
- Example: "Acme Corp" or "TechStart"

### Question 2: Primary Brand Color

Ask: "What is your primary brand color? Please provide a hex code (e.g., #3B82F6 for blue)."

- Used for: Buttons, focus states, active items, accents
- Should have good contrast on white backgrounds
- Example: `#3B82F6` (blue), `#10B981` (green), `#EF4444` (red)

### Question 3: Secondary/Accent Color

Ask: "What is your secondary or accent color? (Or should I auto-generate one from the primary color?)"

- Used for: Hover states, badges, secondary highlights
- Can be auto-generated (10-15% darker than primary)
- Example: `#2563EB` (darker blue)

### Question 4: Logo Type

Ask: "Do you want a text-based logo or an image logo?"

Options:
- **Text-based**: Company name displayed as styled text (current approach)
- **Image**: PNG, SVG, or other image file

### Question 5: Logo File (if image)

If image was selected, ask: "Please provide the path to your logo file."

- Recommended size: Height 32-40px
- Formats: SVG (preferred), PNG, JPG
- Will be placed in `/public/` directory

### Question 6: Favicon (Optional)

Ask: "Do you have a favicon file? (Optional - provide path or skip)"

- Formats: ICO, PNG, or SVG
- Sizes: 16x16, 32x32, or scalable SVG

### Question 7: Dark Mode Colors

Ask: "Do you want dark mode support? If yes, provide dark mode colors or I can auto-generate them."

Options:
- **Auto-generate**: Create dark variants from light mode colors
- **Custom**: User provides specific dark mode hex codes
- **Skip**: No dark mode support

## Branding Elements Inventory

| # | Element | Location | Type |
|---|---------|----------|------|
| 1 | Primary accent | `src/index.css` | CSS Variable |
| 2 | Accent hover | `src/index.css` | CSS Variable |
| 3 | Accent light | `src/index.css` | CSS Variable |
| 4 | Icon bar background | `src/index.css` | CSS Variable |
| 5 | Badge color | `src/index.css` | CSS Variable |
| 6 | Folder icon | `src/index.css` | CSS Variable |
| 7 | Border color | `src/index.css` | CSS Variable |
| 8 | Scrollbar colors | `src/index.css` | Hardcoded |
| 9 | Dark mode variables | `src/index.css` | CSS Class |
| 10 | Logo text | `src/components/Header.tsx` | Component |
| 11 | Page title | `index.html` | HTML |
| 12 | Favicon | `index.html` | Asset |
| 13 | Tree connecting line | `src/components/FolderTree.tsx` | Tailwind |
| 14 | Selected folder state | `src/components/FolderTree.tsx` | Tailwind |
| 15 | Folder icon color | `src/components/FolderTree.tsx` | Tailwind |
| 16 | Table folder icon | `src/components/FolderTable.tsx` | Tailwind |
| 17 | User avatar colors | `src/data/mockData.ts` | Data |

## Supporting Documentation

For detailed implementation instructions, see:

- [CSS_VARIABLES.md](CSS_VARIABLES.md) - Complete CSS variable reference with current values
- [COMPONENT_BRANDING.md](COMPONENT_BRANDING.md) - Component-by-component branding locations
- [REBRANDING_CHECKLIST.md](REBRANDING_CHECKLIST.md) - Step-by-step rebranding process

## Quick Reference: File Locations

```
Key files to modify:
├── src/index.css                    # All CSS variables (colors)
├── src/components/Header.tsx        # Logo and brand name
├── src/components/FolderTree.tsx    # Hardcoded Tailwind colors
├── src/components/FolderTable.tsx   # Folder icon color
├── src/data/mockData.ts             # User avatar colors
├── index.html                       # Page title and favicon
└── public/                          # Logo and favicon assets
```

## Example Rebranding

To rebrand from "Hyland" (purple) to "Acme Corp" (blue):

1. Update CSS variables in `src/index.css`:
   ```css
   :root {
     --accent: #3B82F6;        /* Changed from #7c3aed */
     --accent-hover: #2563EB;  /* Changed from #6d28d9 */
     --accent-light: #DBEAFE;  /* Changed from #ede9fe */
   }
   ```

2. Update logo in `src/components/Header.tsx`:
   ```tsx
   <span className="text-lg font-bold tracking-wider text-[var(--text-primary)]">
     ACME CORP
   </span>
   ```

3. Update page title in `index.html`:
   ```html
   <title>Acme Corp Workspace</title>
   ```

## Troubleshooting

### Colors not updating
- Clear browser cache or hard refresh (Cmd/Ctrl + Shift + R)
- Ensure CSS variable syntax is correct: `var(--accent)`

### Hardcoded colors still showing
- Search for Tailwind classes like `violet-*` or `teal-*`
- Replace with CSS variable references: `[var(--accent)]`

### Logo not appearing
- Check file path is correct
- Ensure image is in `/public/` directory
- Verify file format is supported

# HamForge PWA Icons

This directory should contain the following PWA icons for HamForge:

## Required Icons

| File                        | Size    | Purpose                               |
| --------------------------- | ------- | ------------------------------------- |
| `icon-192x192.png`          | 192x192 | Standard PWA icon                     |
| `icon-512x512.png`          | 512x512 | High-resolution PWA icon              |
| `icon-maskable-512x512.png` | 512x512 | Maskable icon (content in center 80%) |
| `apple-touch-icon.png`      | 180x180 | Apple iOS home screen icon            |

Additionally, the following should be in `src/app/`:
| File | Size | Purpose |
|------|------|---------|
| `favicon.ico` | 32x32 or 48x48 | Browser tab favicon |

## Design Specifications

- **Background Color**: Dark slate `#0f172a`
- **Accent Color**: Orange/amber `#f59e0b`
- **Theme**: Radio/antenna motif or ham radio theme
- **Text**: "HF" letters (for HamForge) if using text

## Maskable Icon Guidelines

The maskable icon (`icon-maskable-512x512.png`) should have:

- Icon content centered in the middle 80% (safe zone)
- 10% padding on all sides
- Safe zone is approximately 410x410 pixels centered in 512x512

## How to Generate Icons

### Option 1: Online Generators (Recommended)

1. **favicon.io** - https://favicon.io/
   - Create from text "HF" with background #0f172a and text color #f59e0b

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - Upload a 512x512 source image
   - Generates all required sizes

3. **Maskable.app** - https://maskable.app/editor
   - Create and test maskable icons
   - Ensure safe zone compliance

### Option 2: Use Included SVG Templates

The `icon-template.svg` file in this directory can be:

1. Opened in a vector editor (Inkscape, Figma, etc.)
2. Exported at required sizes
3. For maskable version, ensure 10% padding

### Option 3: Design Tools

- Figma (free): Create at 512x512, export at multiple sizes
- Canva: Use their icon maker
- Adobe Illustrator/Photoshop

## Verification

After creating icons, verify:

1. All files are PNG format (except favicon.ico)
2. Sizes match exactly as specified
3. Maskable icon passes safe zone test at https://maskable.app/
4. Colors display correctly on both light and dark backgrounds

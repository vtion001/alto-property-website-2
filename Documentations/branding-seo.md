# Branding & SEO Defaults

This document tracks global site branding and SEO defaults applied on 2025-11-04.

## Changes

- Global title set to `ALTO Property` with template `%s | ALTO Property`.
- Favicon references added to the HTML head using both `favicon.ico` and `favicon.svg`.
- Open Graph and Twitter metadata updated to ensure consistent social sharing previews.

## Files Modified

- `app/layout.tsx`
  - Updated `export const metadata` with `title`, `icons`, `openGraph`, and `twitter`.
  - Added explicit `<link rel="icon">` tags in `<head>`.

## Rationale

- Ensures browser tab title and search result title use `ALTO Property`.
- Provides explicit favicon references for broader browser compatibility and Google search favicon display.
- Establishes default social sharing titles for Open Graph and Twitter cards.

## Notes

- Favicon assets already exist in `public/` (`/favicon.ico`, `/favicon.svg`). No image changes required.
- If a PWA manifest is added later (e.g., `public/site.webmanifest`), include matching icon entries (192x192 and 512x512 PNGs).

## Verification Checklist

1. Start dev server: `npm run dev`.
2. Visit the homepage and confirm:
   - Browser tab shows `ALTO Property` or a page-specific title with `| ALTO Property`.
   - Favicon appears in the tab (check both light/dark theme if applicable).
3. Share a page URL via a social card preview tool and verify Open Graph/Twitter titles display `ALTO Property`.
4. Crawl the site (e.g., with `curl -I`) to confirm `<link rel="icon">` tags are present.

## Maintenance

- For pages with custom titles, set `export const metadata = { title: 'Page Title' }` so they still follow the global template.
- Keep Open Graph/Twitter image URLs valid; update `metadata.openGraph.images` and `metadata.twitter.images` when the hero image changes.
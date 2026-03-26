# FoxShop — E-commerce Frontend Project

## Overview
Static HTML/CSS/JS e-commerce store (no framework, no bundler). Served via simple HTTP server from `~/foxshop/ecommerce/`.

## Tech Stack
- **HTML5 + CSS3 + Vanilla JS** — no dependencies
- **Font**: Figtree (Google Fonts)
- **Design tokens**: Slate/Lime color palette from Figma design system
- **Images**: Figma MCP asset URLs (expire after 7 days — need refresh periodically)

## Pages
| Page | File | Description |
|------|------|-------------|
| Homepage | `ecommerce/index.html` | Hero carousel, Just for You, Promo, Categories, Popular Products carousel, Brands, Community, Features, Footer |
| Product Listing (PLP) | `ecommerce/products.html` | Sidebar filters, 12 product cards (3-col grid), grid/list toggle, pagination, sort |
| Product Detail (PDP) | `ecommerce/product.html` | Image gallery with thumbnails, product info, color/size selectors, qty, shipping calc, accordions (Description/Specs/Reviews), deals shelf |

## CSS Architecture
- `css/styles.css` — shared across all pages (navbar, footer, tokens, dark mode, animations, hero, sections)
- `css/products.css` — PLP-specific (filters, product grid, pagination)
- `css/product.css` — PDP-specific (gallery, options, accordions, specs)

## Key Design Decisions

### Layout
- Max content width: **1320px** everywhere (no padding on desktop, 24px side padding below 1380px viewport)
- All sections use consistent `max-width: 1320px; margin: 0 auto` pattern

### Navbar
- **Sticky** with glassmorphism (`rgba(255,255,255,.85)` + `backdrop-filter: blur(10px)`)
- Height: 88px desktop, 64px mobile
- **Mega-menu dropdowns** on hover — each category has subcategories in columns + promo banner on right side
- Mega-menu uses `position: fixed; left: 50%; transform: translateX(-50%)` — always centered on screen
- No bottom border/line on navbar
- Mobile: navbar links hidden (no hamburger menu implemented yet)

### Dark Mode
- Toggle button in footer (moon/sun icon)
- Persisted via `localStorage` key `foxshop-theme`
- Shared across all pages
- CSS uses `[data-theme="dark"]` selector with custom properties (`--bg`, `--bg-elevated`, `--bg-card`, `--text`, `--text-secondary`, `--border`)
- Dark navbar: `rgba(17,17,24,.85)` with same blur

### Animations
- **Scroll reveal**: `.reveal` (fade up), `.reveal-stagger` (children cascade), `.reveal--scale` (scale in)
- Uses `IntersectionObserver` with `threshold: 0.1-0.15`
- Respects `prefers-reduced-motion`
- **Hero carousel text**: staggered fade-in on slide change (title 0.15s, text 0.3s, button 0.45s) via `.is-active` class

### Carousels
- Hero: 3 slides (full-bleed dark background images), auto-play 5s, pause on hover, swipe support
- Popular Products: 3 slides x 2 cards each, same arrow/dot controls as hero
- Both use `translateX` transition with `cubic-bezier(.4, 0, .2, 1)`

### Brands Section
- 6 inline SVG fake logos (Stratos, Wavely, Cubiq, ORBION, Helix, MNTL.)
- Equal-width flex containers
- Dark mode: `filter: brightness(0) invert(1)`

### Figma Source
- Design file: `https://www.figma.com/design/chgvMQsmGBQTA2Hqa9VhEi/e-commerce`
- Material 3 Design Kit reference: `https://www.figma.com/design/0MPnuO0m9Wler27Lzuo9Dp/`
- Hero banner slides from nodes: 144:590, 144:591, 144:592

## Running Locally
```bash
cd ~/foxshop
python3 -m http.server 8090
# Then open http://localhost:8090/ecommerce/
```

## Other Projects in This Repo
- `cinema/` — CinemaBook seat reservation app (Material Design 3, separate project)
- `index.html` + `css/` + `js/` — earlier FoxShop prototype (Material Design style, superseded by `ecommerce/`)

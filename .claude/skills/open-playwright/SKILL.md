---
name: open-playwright
description: "Launch Playwright headed browser with anti-detection and an injected save button to capture page data (screenshots, HTML, CSS, DOM, forms, SVG icons, visual sections). Use when user says /open-playwright, open browser, browse URL, capture page, or scrape page. Saves data organized by domain and page path, compatible with clone-playwright and clone-website skills."
argument-hint: "<url>"
user-invocable: true
---

# Open Playwright

Launch a headed Chrome browser with anti-detection measures and a floating **[保存页面]** button injected in the top-right corner. The user browses freely, then clicks the button to capture the current page's complete data into organized folders.

## Instructions

1. Parse `$ARGUMENTS` as a URL. If no URL is provided or it is invalid, ask the user for a valid URL.
2. Ensure the `playwright` npm package is available. If not, run `npm install playwright`.
3. Run the launch script in the background:

```bash
node .claude/skills/open-playwright/scripts/launch-browser.mjs <url>
```

4. Tell the user:
   - Browser is open with a purple **[保存页面]** button in the top-right corner
   - Navigate to any page, then click the button to capture
   - Each capture saves to `docs/research/<domain>/<page-path>/`
   - Close the browser window to exit

5. The script runs persistently. Do NOT wait for it to finish -- it stays open until the user closes the browser.

## How the Save Button Works

When the user clicks **[保存页面]**:

1. Button shows "保存中..."
2. Script auto-scrolls the page to trigger lazy-loaded content
3. Script captures from the active page:
   - `screenshot.png` -- Full-page screenshot
   - `viewport.png` -- Viewport-only screenshot
   - `page.html` -- Complete HTML source
   - `computed-styles.json` -- Computed CSS of up to 500 elements (all values preserved)
   - `css-variables.json` -- CSS custom properties from ALL selectors (not just :root)
   - `keyframes.json` -- CSS @keyframes animation definitions
   - `media-breakpoints.json` -- CSS @media responsive breakpoints
   - `dom-structure.json` -- DOM hierarchy (12 levels deep, 50 children per node, with layout info)
   - `page-links.json` -- All links on the page
   - `assets.json` -- Image/video/font inventory with section attribution
   - `forms.json` -- Form elements inventory (input, textarea, select)
   - `svg-icons.json` -- Inline SVG icon extraction
   - `sections-visual.json` -- Visual section mapping (bounding boxes, sorted by position)
   - `page-summary.md` -- Markdown summary
4. Auto-generates clone-website research docs:
   - `DESIGN_TOKENS.md` -- Colors (normalized to hex), typography, spacing, shadows, gradients, z-index, blur effects
   - `COMPONENT_INVENTORY.md` -- All identified sections with inner element counts (buttons/headings/images)
   - `LAYOUT_ARCHITECTURE.md` -- DOM tree annotated with display/flex/grid/position info
   - `PAGE_TOPOLOGY.md` -- Section order sorted by visual position (y-coordinate)
   - `components/*.spec.md` -- Per-component specs with DOM (8 levels deep), styles (30 elements), text content
5. Screenshot is also copied to `docs/design-references/` for clone-website
6. Button shows "已保存!" then resets

## Output Structure

```
docs/
  research/
    <domain>/
      DESIGN_TOKENS.md          # Colors (hex), typography, spacing, shadows, gradients, z-index
      COMPONENT_INVENTORY.md    # Sections with inner element counts + buttons + forms
      LAYOUT_ARCHITECTURE.md    # DOM tree with layout annotations (flex/grid/position)
      PAGE_TOPOLOGY.md          # Sections sorted by visual position
      components/
        header.spec.md          # Per-component specs (deep DOM + 30 styles + text)
        sidebar.spec.md
        style-picker.spec.md
        workflow.spec.md
        project-gallery.spec.md
        ...
      <page-path>/
        screenshot.png          # Full page screenshot
        viewport.png            # Viewport-only screenshot
        page.html               # Complete HTML source
        computed-styles.json    # Up to 500 elements with all CSS values
        css-variables.json      # CSS variables from all selectors
        keyframes.json          # @keyframes animations
        media-breakpoints.json  # @media breakpoints
        dom-structure.json      # Deep DOM (12 levels, layout-annotated)
        page-links.json         # All links
        assets.json             # Images with section attribution
        forms.json              # Form elements
        svg-icons.json          # SVG icon extraction
        sections-visual.json    # Visual section mapping
        page-summary.md         # Summary
  design-references/
    <domain>_<page-path>.png
```

## Integration with clone-playwright / clone-website

The captured data is directly usable by `/clone-playwright` and `/clone-website`:
- `sections-visual.json` provides visual section positions for accurate layout reconstruction
- `computed-styles.json` (500 elements) provides exact CSS values for all components
- `dom-structure.json` (12 levels) reveals deep component hierarchy with layout info
- `forms.json` captures all interactive form elements
- `svg-icons.json` extracts inline SVG icons as reusable assets
- `keyframes.json` / `media-breakpoints.json` capture animations and responsive rules
- `DESIGN_TOKENS.md` normalizes colors to hex and extracts gradient colors

## Anti-Detection Features

- `navigator.webdriver` hidden
- Chrome automation flags disabled
- Real Chrome browser channel used
- Persistent user profile at `~/.playwright-browser-profile`
- Login state preserved across sessions

## Dependencies

- Node.js 18+
- `playwright` npm package (install via `npm install playwright`)

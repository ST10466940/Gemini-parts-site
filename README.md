# Gemini Parts — Static Web Skeleton
# Gemini Parts — Marketing Site

This repository contains the initial HTML structure and organized folder layout proposed for the Gemini Parts e‑commerce project.
This repository houses the Gemini Parts marketing experience, built as a static site with reusable assets for future expansion. The project now ships with a home page, dedicated enquiry and contact flows, and supporting SEO resources so the site can be deployed immediately.

It aligns with the **Web Development** workstream in the proposal (semantic HTML with `header`, `nav`, `main`, content sections, and `footer`) and a **clean folder structure** to support future expansion (assets, CSS, JS, etc.).

## Project tree
## Project structure

```
src/
  index.html
  css/
    style.css
  js/
    main.js
  index.html           # Home page with hero, services, testimonials, FAQ, and CTA modals
  enquiry.html         # Service enquiry form with dynamic quote/response handling
  contact.html         # General contact form with email-style summary output
  robots.txt           # Crawl directives for search engines
  sitemap.xml          # Site map linking all public pages
  assets/
    icons/
      logo.svg
      favicon.svg
    images/
    fonts/
.github/
  workflows/   # (optional: CI later)
  css/
    style.css          # Design tokens, layout system, and responsive components
  js/
    main.js            # Navigation, modal, and form validation/AJAX helpers
```

## Local preview

Just open `src/index.html` in your browser, or serve the `src` folder with any static server:
Open `src/index.html`, `src/enquiry.html`, or `src/contact.html` directly in a browser, or serve the `src` folder with any static server:

```bash
# python
# Python
python -m http.server 5173 --directory src
# or Node (if installed)
npx http-server ./src -p 5173
```

Then browse to http://localhost:5173

## Create a new GitHub repo and push

cd "/mnt/data/gemini-parts-site"
git init
git add .
git commit -m "chore: bootstrap Gemini Parts HTML skeleton"

# Create repo on GitHub (one-time via CLI)
# If you use GitHub CLI:
gh repo create YOUR_GITHUB_USERNAME/gemini-parts-site --private --source=. --remote=origin --push
# If you don't use GH CLI, create the repo on the GitHub website,
# then set the remote manually:
# git remote add origin https://github.com/ST10466940/gemini-parts-site.git
# git push -u origin main

Updates

CSS styling refactor

Converted from dark theme to white background with dark-green brand palette.

Introduced design tokens for colors, typography, spacing, and shadows.

Added CSS reset and base styles for cross-browser consistency.

Applied responsive typography scale using rem/clamp().

Added consistent focus states and hover interactions for accessibility.

Layout improvements

Implemented Flexbox/Grid layouts for header, navigation, content, and footer.

Content now adapts across desktop (3-col), tablet (2-col), and mobile (1-col) breakpoints.

Introduced container utility for consistent page width.

Responsive design

Defined breakpoints at 1200px, 900px, and 600px.
Then browse to `http://localhost:5173` (update the path for other pages as needed).

Updated components to scale fluidly with %, rem, and em.
## Key features

Added support for responsive images (srcset, sizes, <picture>).
- **SEO foundations:** semantic HTML, structured headings, descriptive metadata, robots.txt, sitemap.xml, and internal linking for stronger crawlability.
- **Responsive design:** light theme with Gemini palette, CSS design tokens, grid/flex layouts, and clamp-based typography tuned for desktop, tablet, and mobile.
- **Accessible interactions:** focus-visible states, reduced-motion support, ARIA labels, and high-contrast color pairings.
- **Dynamic forms:** enquiry and contact pages provide HTML5 validation, client-side error messaging, and AJAX submissions with contextual feedback (quotes, sponsorship info, or message confirmation).
- **Modular scripts:** a single `main.js` powers navigation behavior, accordions, modals, and reusable form helpers.

Accessibility & performance
## Updating content

Enforced WCAG 2.2 AA contrast ratios for text and UI.
Most copy blocks are organised into semantic sections (hero, services, process, testimonials, FAQ, CTA). Update the relevant HTML file and adjust linked assets or imagery inside `src/assets` as needed. Reuse the existing classes and data attributes to inherit animation and validation behaviour.

Added reduced-motion support for users with motion sensitivity.
## Deployment checklist

Simplified CSS structure for faster rendering and reduced reflows.
1. Serve the `src` directory through your preferred static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).
2. Ensure `robots.txt` and `sitemap.xml` are reachable at the site root.
3. Replace placeholder imagery/logos with production assets in `src/assets`.
4. Configure an email backend or endpoint for the contact form if you need server-side delivery (current implementation simulates sending via AJAX).





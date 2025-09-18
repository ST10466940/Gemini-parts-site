# Gemini Parts — Static Web Skeleton

This repository contains the initial HTML structure and organized folder layout proposed for the Gemini Parts e‑commerce project.

It aligns with the **Web Development** workstream in the proposal (semantic HTML with `header`, `nav`, `main`, content sections, and `footer`) and a **clean folder structure** to support future expansion (assets, CSS, JS, etc.).

## Project tree

```
src/
  index.html
  css/
    style.css
  js/
    main.js
  assets/
    icons/
      logo.svg
      favicon.svg
    images/
    fonts/
.github/
  workflows/   # (optional: CI later)
```

## Local preview

Just open `src/index.html` in your browser, or serve the `src` folder with any static server:

```bash
# python
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

Updated components to scale fluidly with %, rem, and em.

Added support for responsive images (srcset, sizes, <picture>).

Accessibility & performance

Enforced WCAG 2.2 AA contrast ratios for text and UI.

Added reduced-motion support for users with motion sensitivity.

Simplified CSS structure for faster rendering and reduced reflows.

## Next steps

- Hook up product catalog and inventory integration.
- Replace placeholders (logos, images) with brand assets.
- Add CI/CD (e.g., GitHub Actions) to deploy to a static host (GitHub Pages, Cloudflare Pages, Netlify).
- Add a component library and framework as needed.

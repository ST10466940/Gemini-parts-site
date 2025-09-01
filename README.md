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

> Replace `YOUR_GITHUB_USERNAME` and repo name as you prefer.

```bash
cd "/mnt/data/gemini-parts-site"
git init
git add .
git commit -m "chore: bootstrap Gemini Parts HTML skeleton"

# Create repo on GitHub (one-time via CLI)
# If you use GitHub CLI:
gh repo create YOUR_GITHUB_USERNAME/gemini-parts-site --private --source=. --remote=origin --push
# If you don't use GH CLI, create the repo on the GitHub website,
# then set the remote manually:
# git remote add origin https://github.com/YOUR_GITHUB_USERNAME/gemini-parts-site.git
# git push -u origin main
```

## Next steps

- Hook up product catalog and inventory integration.
- Replace placeholders (logos, images) with brand assets.
- Add CI/CD (e.g., GitHub Actions) to deploy to a static host (GitHub Pages, Cloudflare Pages, Netlify).
- Add a component library and framework as needed.

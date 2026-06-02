# jonasrosland.com

Personal blog built with [Hugo](https://gohugo.io/) and the [hugo-winston-theme](https://github.com/zerostaticthemes/hugo-winston-theme).

## Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (0.55+)
- [Node.js](https://nodejs.org/) (for résumé PDF generation)

After cloning, initialize the theme submodule:

```bash
git submodule update --init --recursive
```

## Build the site

```bash
hugo server
```

Open [http://localhost:1313](http://localhost:1313).

For a production build:

```bash
hugo --minify
```

Output is written to `public/`.

## Résumé

The résumé lives at `/resume/` and is sourced from `content/resume.md`.

Visitors can download a pre-generated PDF from the **Download PDF** button on that page. The file is served from `static/files/jonas-rosland-resume.pdf`.

### Generate the PDF

PDF export uses [Playwright](https://playwright.dev/) to render the built résumé page with print styles, so the output is consistent across browsers.

First-time setup:

```bash
npm install
npx playwright install chromium
```

After updating `content/resume.md`, rebuild the site and regenerate the PDF:

```bash
npm run build:site
```

This runs `hugo --minify`, then writes `static/files/jonas-rosland-resume.pdf` (and copies it to `public/files/` if that directory exists).

To regenerate only the PDF (requires an existing `public/` build):

```bash
npm run generate-resume-pdf
```

### PDF settings

Margins, page size, and output path are configured in `scripts/pdf.config.json`.

## Deploy on Render

This site is set up to rebuild the résumé PDF on every deploy.

### Option A: Use the included Blueprint (`render.yaml`)

If you create the service from the repo Blueprint, Render picks up:

- **Build command:** `./scripts/render-build.sh`
- **Publish directory:** `public`
- **Environment:** Hugo `0.162.1`, Node `22`

Push to your connected branch and Render will run the full build (Hugo + PDF) automatically.

### Option B: Update an existing Static Site

In the [Render Dashboard](https://dashboard.render.com/) for your static site:

1. Open **Settings**
2. Set **Build Command** to `./scripts/render-build.sh`
3. Set **Publish Directory** to `public`
4. Under **Environment**, add:
   - `HUGO_VERSION` = `0.162.1`
   - `NODE_VERSION` = `22`
5. Save and trigger a **Manual Deploy**

The build script:

1. Initializes the theme git submodule
2. Installs Hugo Extended, Node dependencies, and Playwright Chromium
3. Runs `hugo --minify`
4. Generates `static/files/jonas-rosland-resume.pdf`

Every push to your linked branch will redeploy with an up-to-date PDF.

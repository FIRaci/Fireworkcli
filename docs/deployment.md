# Deployment Guide

## Platform: GitHub Pages
## URL: https://firaci.github.io/Fireworkcli/
## Deploy Method: GitHub Actions (`.github/workflows/deploy.yml`)
## Repository: https://github.com/FIRaci/Fireworkcli

---

### Automated Deployment

Every push to the `main` branch automatically triggers the GitHub Actions workflow to build and deploy the application to GitHub Pages.

### Manual Setup on GitHub (if not using GitHub Actions)

1. Go to repository **Settings** -> **Pages**.
2. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions` (Recommended) or `Deploy from a branch` -> `main` -> `/ (root)`.
3. Save changes. GitHub Pages will be live at `https://firaci.github.io/Fireworkcli/`.

---

### Local Testing

```bash
# Run local static server
python -m http.server 8080
# Or using npx
npx serve .
```

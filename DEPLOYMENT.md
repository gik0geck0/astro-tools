# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your astrophotography tools to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository

## Step 1: Update Configuration

**Important**: Before deploying, you need to update the `astro.config.mjs` file with your actual GitHub username and repository name:

```javascript
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',  // Replace YOUR_USERNAME
  base: '/YOUR_REPO_NAME',                  // Replace YOUR_REPO_NAME
  integrations: [preact()]
});
```

For example, if your username is `astrophotographer` and your repo is `astro-tools`:
```javascript
export default defineConfig({
  site: 'https://astrophotographer.github.io',
  base: '/astro-tools',
  integrations: [preact()]
});
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## Step 3: Deploy

### Option A: Automatic Deployment (Recommended)

1. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Option B: Manual Deployment

If you prefer manual deployment:

1. Build your site:
   ```bash
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Step 4: Verify Deployment

1. Go to your repository's **Actions** tab to see the deployment progress
2. Once complete, visit your site at the GitHub Pages URL
3. Test all the calculators to ensure they work correctly

## Troubleshooting

### Common Issues:

1. **404 Error**: Make sure the `base` path in `astro.config.mjs` matches your repository name
2. **Build Fails**: Check the Actions tab for error messages
3. **Site Not Loading**: Ensure GitHub Pages is enabled and set to use GitHub Actions

### Updating Your Site:

- Simply push changes to the `main` branch
- GitHub Actions will automatically rebuild and redeploy
- No manual intervention needed

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to your `public/` folder with your domain
2. Update your DNS settings to point to GitHub Pages
3. Update the `site` URL in `astro.config.mjs`

## Environment Variables

If you need environment variables for your build:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets there
3. They'll be available during the build process

Your astrophotography tools will be live and accessible to everyone! 🌌

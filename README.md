# KMIC Assessment Tool - Deployment Guide

Interactive web app for assessing Knowledge Management Infrastructure Capability (KMIC) levels in A/E/C organizations. Uses Gemini AI for personalized improvement recommendations.

## Architecture

```
GitHub Repo  --push-->  Cloudflare Pages (auto-builds React app)
                              |
                              +-- /api/recommend  (Cloudflare Function, stores Gemini key)
                              |         |
                              |         +--> Google Gemini 2.5 Flash Lite
                              |
                              +-- Static React app (Vite build)
```

Everything lives in one repo. Push to GitHub and it auto-deploys.

## Setup (One-Time, ~15 minutes)

### Step 1: Get a Gemini API Key

1. Go to https://aistudio.google.com/apikey
2. Click **Create API Key**
3. Copy the key (you will need it in Step 3)

### Step 2: Push Code to GitHub

1. Create a new repository on GitHub (e.g., `kmic-assessment`)
2. Push this entire folder to the repo:

```bash
cd kmic-deploy
git init
git add .
git commit -m "Initial KMIC assessment tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kmic-assessment.git
git push -u origin main
```

### Step 3: Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com (sign up free if needed)
2. Click **Workers & Pages** in the left sidebar
3. Click **Create** > **Pages** > **Connect to Git**
4. Select your GitHub account and the `kmic-assessment` repository
5. Configure the build settings:
   - **Framework preset**: None
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**
7. Wait for the first build to complete (~1-2 minutes)

### Step 4: Add the Gemini API Key

1. In Cloudflare Pages, go to your project
2. Click **Settings** > **Environment variables**
3. Click **Add variable**:
   - Variable name: `GEMINI_API_KEY`
   - Value: paste your Gemini API key from Step 1
4. Select **Encrypt** (important for security)
5. Make sure it applies to **Production** (and Preview if you want)
6. Click **Save**
7. Go to **Deployments** and click **Retry deployment** on the latest one (so it picks up the new variable)

### Done!

Your app is now live at: `https://kmic-assessment.pages.dev` (or whatever Cloudflare assigned).

## Updating the App

Just push to GitHub. Cloudflare auto-builds and deploys:

```bash
# Edit files locally, then:
git add .
git commit -m "Updated the app"
git push
```

Cloudflare will detect the push, rebuild, and deploy within ~1 minute.

## Project Structure

```
kmic-deploy/
  index.html              # HTML entry point
  package.json            # Dependencies (React, Vite)
  vite.config.js          # Vite build config
  src/
    main.jsx              # React entry
    App.jsx               # Main KMIC app (all logic + UI)
  functions/
    api/
      recommend.js        # Cloudflare Function (Gemini proxy)
  .gitignore
  README.md
```

## How the API Key Stays Secure

- The Gemini API key is stored as an **encrypted environment variable** in Cloudflare
- The `functions/api/recommend.js` file runs on Cloudflare's servers, not in the browser
- The frontend only calls `/api/recommend` on the same domain
- The API key never appears in your code, your GitHub repo, or the browser

## Local Development (Optional)

If you want to test locally before pushing:

```bash
npm install
npm run dev
```

This starts the React app on localhost:5173. Note: the AI recommendations will not work locally because the Cloudflare Function only runs on Cloudflare. Everything else (scoring, charts, benchmarks) works locally.

## Cost

- GitHub: free
- Cloudflare Pages: free (100,000 requests/day)
- Gemini 2.5 Flash Lite: free tier (check current limits at https://ai.google.dev/pricing)

## For the Paper

Add this sentence to your manuscript:

> "An open-access web-based KMIC assessment tool implementing the proposed EI model is available at [YOUR_URL], enabling A/E/C practitioners to evaluate their organizational KMIC levels and receive AI-assisted improvement recommendations."

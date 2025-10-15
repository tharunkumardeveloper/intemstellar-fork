# The Paradox Protocol Event Integration

## What Was Done

Successfully integrated The Paradox Protocol event website from the GitHub repository into your main website.

## Changes Made

### 1. Cloned the Paradox Protocol Repository
- **Repository**: https://github.com/RVKB2005/paradox-loop-chronicle-07635-43315
- **Cloned to**: `paradox-protocol-site/` folder in your project root
- This is the complete, standalone Paradox Protocol website

### 2. Built and Deployed the Paradox Protocol Site
- Installed dependencies in the cloned repository
- Configured to run on port 5000 (dev) and `/paradox-protocol-site/` (production)
- Built the production version using `npm run build`
- Copied the built files to `public/paradox-protocol-site/`

### 3. Updated Event Card
- **File**: `src/components/3d/EventCard3D.tsx`
- Updated "Register Now" button to open the Paradox Protocol site when clicked
- Development: Opens `http://localhost:5000`
- Production: Opens `/paradox-protocol-site/`

## Testing in Development

### Easy Way - Use the Batch File:
Double-click: **`run-both-dev-servers.bat`**

This starts all servers including:
- ✅ Paradox Protocol on http://localhost:5000

### Manual Way:
```bash
cd paradox-protocol-site
npm run dev
```

## Testing Steps

1. Start all servers (use batch file)
2. Open http://localhost:8080 (main site)
3. Scroll to "Featured Events"
4. Click on **The Paradox Protocol** card to flip it
5. Click **"Register Now"**
6. Paradox Protocol site opens in a new tab at http://localhost:5000 ✨

## Features of the Paradox Protocol Site

- **Complete Event Website**: Full standalone site
- **Dark Theme**: Themed design matching the "Dark" series
- **Time Loop Concept**: Unique paradox-themed interactions
- **Registration System**: Complete registration functionality
- **Responsive Design**: Works on all devices

## Updating the Paradox Protocol Site

If you need to update:

1. Make changes in the `paradox-protocol-site/` folder
2. Rebuild:
   ```bash
   cd paradox-protocol-site
   npm run build
   ```
3. Copy to public:
   ```bash
   xcopy paradox-protocol-site\dist public\paradox-protocol-site\ /E /I /Y
   ```

## Port Assignment

- **Development**: Port 5000
- **Production**: `/paradox-protocol-site/`

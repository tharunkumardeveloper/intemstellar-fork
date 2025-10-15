# Ventura Event Integration

## What Was Done

Successfully integrated the Ventura event website from the GitHub repository into your main website.

## Changes Made

### 1. Cloned the Ventura Repository
- **Repository**: https://github.com/RVKB2005/venture-game-on-04199-24678-58269-90543
- **Cloned to**: `ventura-site/` folder in your project root
- This is the complete, standalone Ventura website

### 2. Built and Deployed the Ventura Site
- Installed dependencies in the cloned repository
- Configured to run on port 4000 (dev) and `/ventura-site/` (production)
- Built the production version using `npm run build`
- Copied the built files to `public/ventura-site/`

### 3. Updated Event Card
- **File**: `src/components/3d/EventCard3D.tsx`
- Updated "Register Now" button to open the Ventura site when clicked on the Ventura card
- Development: Opens `http://localhost:4000`
- Production: Opens `/ventura-site/`

## Project Structure

```
your-project/
├── brand-o-vation-site/          # Port 3000 (dev)
├── ventura-site/                 # Port 4000 (dev)
├── public/
│   ├── brand-o-vation-site/      # Production static files
│   └── ventura-site/             # Production static files
└── src/
    └── components/
        └── 3d/
            └── EventCard3D.tsx   # Updated with both links
```

## Port Assignments

- **Main Site**: Port 8080
- **Brand-O-Vation**: Port 3000
- **Ventura**: Port 4000

## Testing in Development

You need to run **all three** development servers:

### Easy Way - Use the Batch File:
Double-click: **`run-both-dev-servers.bat`**

This starts:
- ✅ Main site on http://localhost:8080
- ✅ Brand-O-Vation on http://localhost:3000
- ✅ Ventura on http://localhost:4000

### Manual Way - Three Terminals:

**Terminal 1 - Main Site:**
```bash
npm run dev
```

**Terminal 2 - Brand-O-Vation:**
```bash
cd brand-o-vation-site
npm run dev
```

**Terminal 3 - Ventura:**
```bash
cd ventura-site
npm run dev
```

## Testing Steps

1. Start all three servers (use batch file or manual method)
2. Open http://localhost:8080 (main site)
3. Scroll to "Featured Events"
4. Click on the **Ventura** card to flip it
5. Click **"Register Now"**
6. Ventura site opens in a new tab at http://localhost:4000 ✨

## Production Deployment

When you deploy to production:

1. Build your main site: `npm run build`
2. The `public/ventura-site/` folder is included in the build
3. The button automatically uses `/ventura-site/` path
4. Everything works seamlessly!

## Updating the Ventura Site

If you need to update the Ventura site:

1. Make changes in the `ventura-site/` folder
2. Rebuild:
   ```bash
   cd ventura-site
   npm run build
   ```
3. Copy to public:
   ```bash
   xcopy ventura-site\dist public\ventura-site\ /E /I /Y
   ```

## Features of the Ventura Site

- **Complete Event Website**: Full standalone site
- **Squid Game Theme**: Themed design matching the event
- **Registration System**: Complete registration functionality
- **Interactive Elements**: Game-themed interactions
- **Responsive Design**: Works on all devices

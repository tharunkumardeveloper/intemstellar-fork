# Event Sites Integration

## What Was Done

Successfully integrated multiple event websites from GitHub repositories into your main website:
- ✅ Brand-O-Vation
- ✅ Ventura
- ✅ The Paradox Protocol
- ✅ Capitalyze

## Changes Made

### 1. Cloned the Brand-O-Vation Repository
- **Repository**: https://github.com/RVKB2005/adpocalypse-survivor-95049-37684-83510
- **Cloned to**: `brand-o-vation-site/` folder in your project root
- This is the complete, standalone Brand-O-Vation website

### 2. Built and Deployed the Brand-O-Vation Site
- Installed dependencies in the cloned repository
- Built the production version using `npm run build`
- Copied the built files to `public/brand-o-vation-site/`
- The site is now accessible at `/brand-o-vation-site/` from your main website

### 3. Updated Event Card
- **File**: `src/components/3d/EventCard3D.tsx`
- Updated "Register Now" button to open the Brand-O-Vation site in a new tab when clicked on the Brand-O-Vation card
- Uses `window.open("/brand-o-vation-site/", "_blank")` to open in new tab
- Other event cards show "coming soon" alert

## How It Works

1. User visits your main homepage
2. Scrolls to "Featured Events" section
3. Clicks on the Brand-O-Vation card to flip it
4. Clicks "Register Now" button on the back of the card
5. The complete Brand-O-Vation website opens in a new tab
6. User can interact with the full Brand-O-Vation site (registration, event details, etc.)

## Project Structure

```
your-project/
├── brand-o-vation-site/          # Cloned repository (source)
│   ├── src/
│   ├── dist/                     # Built files
│   └── package.json
├── public/
│   └── brand-o-vation-site/      # Deployed Brand-O-Vation site
│       ├── index.html
│       ├── assets/
│       └── ...
└── src/
    └── components/
        └── 3d/
            └── EventCard3D.tsx   # Updated with link
```

## Testing in Development

You need to run **both** development servers:

### Terminal 1 - Main Site (Port 8080):
```bash
npm run dev
```

### Terminal 2 - Brand-O-Vation Site (Port 3000):
```bash
cd brand-o-vation-site
npm run dev
```

Then:
1. Navigate to http://localhost:8080 (your main site)
2. Scroll to Featured Events
3. Click on Brand-O-Vation card to flip it
4. Click "Register Now"
5. The Brand-O-Vation site opens in a new tab at http://localhost:3000

**Important**: 
- In **development**, the button opens `http://localhost:3000` (Brand-O-Vation dev server)
- In **production**, the button opens `/brand-o-vation-site/` (static files from public folder)

## Features of the Brand-O-Vation Site

The integrated site includes:
- **Complete Event Website**: Full standalone site with all features
- **Event Information**: Details about "The Last Ad-pocalypse" event
- **Registration System**: Complete registration functionality
- **Apocalypse Theme**: Zombie-themed design matching "All of Us Are Dead"
- **Interactive Elements**: Wheel of survival, stage information, etc.
- **Responsive Design**: Works on all devices

## Updating the Brand-O-Vation Site

If you need to update the Brand-O-Vation site in the future:

1. Make changes in the `brand-o-vation-site/` folder
2. Rebuild the site:
   ```bash
   cd brand-o-vation-site
   npm run build
   ```
3. Copy the new build to public:
   ```bash
   xcopy brand-o-vation-site\dist public\brand-o-vation-site\ /E /I /Y
   ```

## Alternative Deployment Options

If you want to deploy the Brand-O-Vation site separately:

1. **Deploy to a subdomain**: Deploy to `brandovation.yourdomain.com`
2. **Update the link** in `EventCard3D.tsx`:
   ```typescript
   window.open("https://brandovation.yourdomain.com", "_blank");
   ```

## Notes

- The Brand-O-Vation site is completely independent and self-contained
- No changes were made to your main website's structure or routing
- The site opens in a new tab to maintain separation
- All original Brand-O-Vation features and functionality are preserved


## Quick Start (Easiest Way)

### Windows:
Double-click `run-both-dev-servers.bat` - this will start all servers automatically!

### Manual Start:
Open four terminal windows and run:
- Terminal 1: `npm run dev` (main site on port 8080)
- Terminal 2: `cd brand-o-vation-site && npm run dev` (Brand-O-Vation on port 3000)
- Terminal 3: `cd ventura-site && npm run dev` (Ventura on port 4000)
- Terminal 4: `cd paradox-protocol-site && npm run dev` (Paradox Protocol on port 5000)

## Troubleshooting

### Issue: "Page Not Found" or "Cannot connect" when clicking Register Now
**Solution**: Make sure ALL development servers are running:
1. Main site on port 8080: `npm run dev`
2. Brand-O-Vation site on port 3000: `cd brand-o-vation-site && npm run dev`
3. Ventura site on port 4000: `cd ventura-site && npm run dev`
4. Paradox Protocol site on port 5000: `cd paradox-protocol-site && npm run dev`

Use the `run-both-dev-servers.bat` file for convenience!

### Issue: Port already in use
**Solution**: 
- If port 8080 is busy: Stop other apps using that port
- If port 3000 is busy: Change the port in `brand-o-vation-site/vite.config.ts`

### Issue: Intro animation plays again
**Solution**: This happens if the Brand-O-Vation dev server isn't running. Make sure both servers are running (see above).

### Issue: Assets not loading in production
**Solution**: Rebuild the Brand-O-Vation site and copy it again:
```bash
cd brand-o-vation-site
npm run build
cd ..
xcopy brand-o-vation-site\dist public\brand-o-vation-site\ /E /I /Y
```

## Production Deployment

When you deploy to production, the setup automatically works:

1. Build your main site: `npm run build`
2. The `public/brand-o-vation-site/` folder is included in the build
3. The button automatically uses `/brand-o-vation-site/` path (not localhost:3000)
4. Everything works seamlessly!

The code automatically detects if you're in development or production:
```typescript
const brandOVationUrl = import.meta.env.DEV 
  ? "http://localhost:3000"        // Development: separate dev server
  : "/brand-o-vation-site/";       // Production: static files
```

## Technical Details

### Why multiple servers in development?
- Your main site runs on port 8080 with its own React Router
- Brand-O-Vation site runs on port 3000 with its own React Router
- Ventura site runs on port 4000 with its own React Router
- Paradox Protocol site runs on port 5000 with its own React Router
- They can't share the same dev server because they have different routing logic
- In production, all event sites are pre-built static files, so no conflict

### Why the base path is needed (Production)
The Brand-O-Vation site is a React SPA with its own router. When served from a subdirectory (`/brand-o-vation-site/`), it needs to know its base path so that:
- Asset paths are correct (JS, CSS, images)
- React Router routes work properly
- Navigation within the app functions correctly

### How it works
**Development:**
1. Main site runs on port 8080
2. Brand-O-Vation runs on port 3000
3. Ventura runs on port 4000
4. Paradox Protocol runs on port 5000
5. Buttons open respective localhost URLs in new tabs

**Production:**
1. Event sites are built with appropriate base paths
2. All asset references are prefixed correctly
3. Buttons open static file paths (e.g., `/brand-o-vation-site/`, `/ventura-site/`)
4. Works correctly at `http://yoursite.com/event-site-name/`

## Port Reference

| Site | Dev Port | Production Path |
|------|----------|----------------|
| Main Site | 8080 | / |
| Brand-O-Vation | 3000 | /brand-o-vation-site/ |
| Ventura | 4000 | /ventura-site/ |
| Paradox Protocol | 5000 | /paradox-protocol-site/ |
| Capitalyze | 6000 | /capitalyze-site/ |

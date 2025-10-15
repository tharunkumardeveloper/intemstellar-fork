# Event Sites Integration - Quick Reference

## 🚀 Quick Start

### Easiest Way (Windows):
**Double-click: `run-both-dev-servers.bat`**

This automatically starts all five servers:
- ✅ Main site: http://localhost:8080
- ✅ Brand-O-Vation: http://localhost:3000
- ✅ Ventura: http://localhost:4000
- ✅ Paradox Protocol: http://localhost:5000
- ✅ Capitalyze: http://localhost:6000

### Manual Start:
Open four terminals:

```bash
# Terminal 1 - Main Site
npm run dev

# Terminal 2 - Brand-O-Vation
cd brand-o-vation-site
npm run dev

# Terminal 3 - Ventura
cd ventura-site
npm run dev

# Terminal 4 - Paradox Protocol
cd paradox-protocol-site
npm run dev
```

## 📋 Port Reference

| Site | Dev Port | Production Path | Repository |
|------|----------|----------------|------------|
| Main Site | 8080 | / | (current repo) |
| Brand-O-Vation | 3000 | /brand-o-vation-site/ | [Link](https://github.com/RVKB2005/adpocalypse-survivor-95049-37684-83510) |
| Ventura | 4000 | /ventura-site/ | [Link](https://github.com/RVKB2005/venture-game-on-04199-24678-58269-90543) |
| Paradox Protocol | 5000 | /paradox-protocol-site/ | [Link](https://github.com/RVKB2005/paradox-loop-chronicle-07635-43315) |
| Capitalyze | 6000 | /capitalyze-site/ | [Link](https://github.com/RVKB2005/boardroom-empires-51196) |

## 🧪 Testing

1. Start all servers (use batch file)
2. Open http://localhost:8080
3. Scroll to "Featured Events"
4. Click on any event card to flip it
5. Click "Register Now"
6. Event site opens in new tab!

## 📁 Project Structure

```
your-project/
├── src/                          # Main site source
├── public/
│   ├── brand-o-vation-site/      # Brand-O-Vation production build
│   ├── ventura-site/             # Ventura production build
│   └── paradox-protocol-site/    # Paradox Protocol production build
├── brand-o-vation-site/          # Brand-O-Vation dev (port 3000)
├── ventura-site/                 # Ventura dev (port 4000)
├── paradox-protocol-site/        # Paradox Protocol dev (port 5000)
└── run-both-dev-servers.bat      # Convenience launcher
```

## 🔄 Updating Event Sites

### Update Brand-O-Vation:
```bash
cd brand-o-vation-site
# Make your changes
npm run build
cd ..
xcopy brand-o-vation-site\dist public\brand-o-vation-site\ /E /I /Y
```

### Update Ventura:
```bash
cd ventura-site
# Make your changes
npm run build
cd ..
xcopy ventura-site\dist public\ventura-site\ /E /I /Y
```

### Update Paradox Protocol:
```bash
cd paradox-protocol-site
# Make your changes
npm run build
cd ..
xcopy paradox-protocol-site\dist public\paradox-protocol-site\ /E /I /Y
```

## 🚢 Production Deployment

Just build your main site:
```bash
npm run build
```

The event sites in `public/` are automatically included!

## ❓ Troubleshooting

### "Cannot connect" or "Page Not Found"
- Make sure ALL four dev servers are running
- Use the batch file for convenience

### Port already in use
- Check if another app is using ports 8080, 3000, 4000, or 5000
- Close other dev servers or change ports in vite configs

### Assets not loading
- Rebuild the event site
- Copy to public folder again (see "Updating Event Sites" above)

## 📚 Detailed Documentation

- [Brand-O-Vation Integration](./BRAND-O-VATION-INTEGRATION.md)
- [Ventura Integration](./VENTURA-INTEGRATION.md)

## ✨ How It Works

**Development Mode:**
- Each site runs on its own dev server
- Register buttons open localhost URLs
- Hot reload works for each site independently

**Production Mode:**
- Event sites are pre-built and served as static files
- Register buttons open relative paths
- Everything is bundled together

The code automatically detects the environment:
```typescript
const eventUrl = import.meta.env.DEV 
  ? "http://localhost:3000"    // Development
  : "/brand-o-vation-site/";   // Production
```

## 🎯 Next Steps

To add more event sites:
1. Clone the repository
2. Update `vite.config.ts` with unique port and base path
3. Build and copy to `public/event-name/`
4. Update `EventCard3D.tsx` to handle the new event
5. Add to `run-both-dev-servers.bat`

---

**Need help?** Check the detailed documentation files or the troubleshooting section above.

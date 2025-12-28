# Deployment Guide

## Phone Flip Guess Game Deployment Instructions

### Quick Deploy Options

#### 1. GitHub Pages (Recommended for Quick Setup)

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select your branch (usually `main`) and `/root` folder
4. Click Save
5. Your game will be available at `https://yourusername.github.io/flipper-guess-game/`

#### 2. Netlify (Easiest with Custom Domain)

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop your project folder or connect your GitHub repo
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `.` (current directory)
4. Click "Deploy"
5. Optional: Add custom domain in Site Settings

#### 3. Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Your game will be deployed instantly

#### 4. Simple HTTP Server (Local Testing)

For local testing before deployment:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Important Notes

1. **HTTPS Required**: The device orientation API (accelerometer) requires HTTPS in production
2. **Mobile Testing**: Test on actual mobile devices, not just desktop browsers
3. **iOS Permission**: iOS 13+ requires explicit permission for device orientation
4. **Browser Support**: Works best on modern mobile browsers (Chrome, Safari, Firefox)

### File Structure

```
flipper-guess-game/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── app.js             # Game logic and state management
├── words.js           # Word database for all categories
├── manifest.json      # PWA manifest
├── service-worker.js  # Offline support
├── icon-192.png       # App icon (small)
├── icon-512.png       # App icon (large)
└── README.md          # Documentation
```

### Testing Checklist

Before deploying, test:
- [ ] All screens load correctly
- [ ] Category selection works
- [ ] Countdown animation plays
- [ ] Accelerometer detection works (flip up/down)
- [ ] Timer counts down properly
- [ ] Score tracking is accurate
- [ ] Sound and vibration work (if enabled)
- [ ] Results screen displays correctly
- [ ] Settings save and persist
- [ ] Works in landscape orientation
- [ ] PWA can be installed on mobile
- [ ] Offline mode works after first load

### Browser Compatibility

| Browser | Mobile | Desktop | Notes |
|---------|--------|---------|-------|
| Chrome | ✅ | ✅ | Full support |
| Safari | ✅ | ⚠️ | iOS 13+ requires permission |
| Firefox | ✅ | ✅ | Full support |
| Edge | ✅ | ✅ | Full support |
| Opera | ✅ | ✅ | Full support |

### Troubleshooting

**Issue**: Accelerometer not working
- **Solution**: Ensure you're using HTTPS and have granted device orientation permission

**Issue**: PWA not installing
- **Solution**: Verify manifest.json is accessible and all icons exist

**Issue**: Service worker not caching
- **Solution**: Check browser console for errors, ensure all file paths are correct

**Issue**: Sound not playing
- **Solution**: Check that sound is enabled in settings and browser allows audio

### Performance Optimization

For production deployment, consider:
1. Minifying CSS and JavaScript
2. Optimizing images (convert SVG icons to PNG if needed)
3. Adding a CDN for faster global access
4. Implementing analytics to track usage

### Support

For issues or questions, please open an issue on the GitHub repository.

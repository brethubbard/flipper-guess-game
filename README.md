# 📱 Phone Flip Guess Game

A fun, charades-style party game for mobile devices where players hold their phone to their forehead while friends give clues. Use the accelerometer to flip the phone down for correct answers or up to pass!

## 🎮 Game Overview

This is a mobile Progressive Web App (PWA) that brings the classic "heads up" style gameplay to any smartphone. Perfect for parties, family gatherings, or just having fun with friends!

### How to Play

1. **Choose a Category** - Select from 8 different categories including Movies, Animals, Sports, and more
2. **Hold to Forehead** - Place your phone on your forehead facing outward (landscape mode)
3. **Get Clues** - Your friends give you hints about the word displayed
4. **Flip Down** - When you guess correctly, tilt the phone face-down
5. **Flip Up** - Can't get it? Tilt the phone face-up to pass
6. **Beat the Clock** - Score as many correct answers as you can in 60 seconds!

## ✨ Features

### Core Gameplay
- **8 Categories** with 50+ words each:
  - 🎬 Movies & TV Shows
  - ⭐ Famous People
  - 🐾 Animals
  - 🍕 Food & Drinks
  - 🎯 Actions & Activities
  - ✈️ Places & Travel
  - ⚽ Sports
  - 🎈 Kids & Family (easier words)
  - 🎲 Random Mix (all categories)

- **Accelerometer Controls** - Uses device orientation for intuitive flip gestures
- **Countdown Timer** - Ready, 3, 2, 1, GO! animation before each round
- **Real-time Scoring** - Track correct answers and passes during gameplay
- **Results Screen** - View your final score and statistics after each round

### Customization
- **Sound Effects** - Toggle audio feedback on/off
- **Vibration** - Haptic feedback for each action
- **Timer Options** - Choose from 30, 60, 90, or 120 second rounds
- **Settings Persistence** - Your preferences are saved locally

### Technical Features
- **Progressive Web App (PWA)** - Install on your home screen like a native app
- **Offline Support** - Play without an internet connection after first load
- **Cross-platform** - Works on iOS and Android devices
- **Landscape Orientation** - Optimized for horizontal gameplay
- **Wake Lock** - Screen stays on during active gameplay
- **Responsive Design** - Adapts to different screen sizes

## 🚀 Quick Start

### Option 1: Play Online (Easiest)

1. Visit the deployed game URL on your mobile device
2. Tap "Add to Home Screen" when prompted (optional)
3. Start playing!

### Option 2: Local Development

1. Clone this repository
```bash
git clone https://github.com/yourusername/flipper-guess-game.git
cd flipper-guess-game
```

2. Start a local web server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

3. Open your browser to `http://localhost:8000`

**Note:** For accelerometer testing, you need:
- A mobile device (desktop browsers have limited accelerometer support)
- HTTPS in production (required for device orientation API)

## 📂 Project Structure

```
flipper-guess-game/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # Game logic, state management, accelerometer
├── words.js           # Word database for all categories
├── manifest.json      # PWA manifest for installation
├── service-worker.js  # Service worker for offline support
├── icon-192.png       # App icon (192x192)
├── icon-512.png       # App icon (512x512)
├── README.md          # This file
└── DEPLOYMENT.md      # Deployment instructions
```

## 🛠 Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Gradients, animations, flexbox/grid layouts
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Device Orientation API** - Accelerometer detection
- **Web Audio API** - Sound effect generation
- **Service Worker API** - Offline caching
- **Vibration API** - Haptic feedback
- **Screen Wake Lock API** - Keep screen active
- **Local Storage API** - Settings persistence

## 🎨 Design Highlights

- **Modern UI** - Clean, colorful interface with smooth transitions
- **Visual Feedback** - Flash animations for correct/pass actions
- **Large Text** - Easy to read from a distance
- **Accessibility** - High contrast colors and touch-friendly buttons
- **Animations** - Pulse effects, progress bars, and smooth fades

## 📱 Browser Compatibility

| Feature | Chrome/Edge | Safari | Firefox |
|---------|-------------|--------|---------|
| Accelerometer | ✅ | ✅* | ✅ |
| PWA Install | ✅ | ✅ | ✅ |
| Offline Mode | ✅ | ✅ | ✅ |
| Vibration | ✅ | ❌ | ✅ |
| Wake Lock | ✅ | ❌ | ✅ |

*iOS 13+ requires explicit permission for device orientation

## 🔧 Development Notes

### Adding New Categories

Edit `words.js` to add new categories:

```javascript
newCategory: {
    name: "Category Name",
    icon: "🎯",
    words: [
        "Word 1", "Word 2", "Word 3", // ... 50+ words
    ]
}
```

### Adjusting Accelerometer Sensitivity

In `app.js`, modify the `flipThreshold` value:

```javascript
this.flipThreshold = 140; // Default: 140 degrees
// Lower = more sensitive, Higher = less sensitive
```

### Customizing Timer Duration

Default options are in `app.js` settings, but you can add more in the HTML select:

```html
<option value="45">45 seconds</option>
```

## 🐛 Troubleshooting

**Accelerometer not working?**
- Ensure you're using HTTPS (required for production)
- Grant permission when prompted (iOS 13+)
- Test on an actual mobile device, not desktop

**PWA not installing?**
- Check that manifest.json is accessible
- Verify icon files exist
- Ensure you're using HTTPS

**Sounds not playing?**
- Check that sound is enabled in Settings
- Some browsers block audio until user interaction
- iOS may mute web audio if device is on silent mode

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new word categories
- Improve accelerometer detection
- Enhance UI/UX
- Fix bugs
- Add new features

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎉 Credits

Created with ❤️ for party game enthusiasts everywhere!

---

**Enjoy the game! 🎮📱✨** 

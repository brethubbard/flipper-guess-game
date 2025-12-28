class PhoneFlipGame {
    constructor() {
        this.currentScreen = 'main-menu';
        this.selectedCategory = null;
        this.currentWords = [];
        this.currentWordIndex = 0;
        this.score = 0;
        this.passCount = 0;
        this.totalWords = 0;
        this.timer = null;
        this.timeRemaining = 60;
        this.isPaused = false;
        this.isGameActive = false;

        // Settings
        this.settings = {
            sound: true,
            vibration: true,
            timerDuration: 60
        };

        // Accelerometer
        this.lastOrientation = null;
        this.flipCooldown = false;
        this.flipThreshold = 140;

        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.populateCategories();
        this.requestPermissions();
    }

    loadSettings() {
        const saved = localStorage.getItem('gameSettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            document.getElementById('sound-toggle').checked = this.settings.sound;
            document.getElementById('vibration-toggle').checked = this.settings.vibration;
            document.getElementById('timer-duration').value = this.settings.timerDuration;
        }
    }

    saveSettings() {
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
    }

    setupEventListeners() {
        // Main Menu
        document.getElementById('play-btn').addEventListener('click', () => this.showScreen('category-selection'));
        document.getElementById('how-to-play-btn').addEventListener('click', () => this.showScreen('how-to-play'));
        document.getElementById('settings-btn').addEventListener('click', () => this.showScreen('settings'));

        // How to Play
        document.getElementById('back-to-menu-btn').addEventListener('click', () => this.showScreen('main-menu'));

        // Settings
        document.getElementById('sound-toggle').addEventListener('change', (e) => {
            this.settings.sound = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('vibration-toggle').addEventListener('change', (e) => {
            this.settings.vibration = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('timer-duration').addEventListener('change', (e) => {
            this.settings.timerDuration = parseInt(e.target.value);
            this.saveSettings();
        });

        document.getElementById('back-from-settings-btn').addEventListener('click', () => this.showScreen('main-menu'));

        // Category Selection
        document.getElementById('back-from-category-btn').addEventListener('click', () => this.showScreen('main-menu'));

        // Pause
        document.getElementById('pause-btn').addEventListener('click', () => this.pauseGame());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeGame());
        document.getElementById('quit-btn').addEventListener('click', () => this.quitGame());

        // Results
        document.getElementById('play-again-btn').addEventListener('click', () => this.playAgain());
        document.getElementById('change-category-btn').addEventListener('click', () => this.showScreen('category-selection'));
        document.getElementById('back-to-menu-results-btn').addEventListener('click', () => this.showScreen('main-menu'));

        // Keep screen awake during gameplay
        this.setupWakeLock();
    }

    async setupWakeLock() {
        if ('wakeLock' in navigator) {
            try {
                document.addEventListener('visibilitychange', async () => {
                    if (this.isGameActive && document.visibilityState === 'visible') {
                        this.wakeLock = await navigator.wakeLock.request('screen');
                    }
                });
            } catch (err) {
                console.log('Wake Lock not supported');
            }
        }
    }

    async requestPermissions() {
        // Request device orientation permission for iOS
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ devices
            // We'll request permission when the game starts
            this.needsPermission = true;
        } else {
            // Non-iOS or older iOS
            this.needsPermission = false;
            this.setupOrientationListener();
        }
    }

    async requestDeviceOrientation() {
        if (this.needsPermission) {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    this.setupOrientationListener();
                    return true;
                } else {
                    alert('Device orientation permission is required to play the game.');
                    return false;
                }
            } catch (error) {
                console.error('Error requesting device orientation:', error);
                return false;
            }
        }
        return true;
    }

    setupOrientationListener() {
        window.addEventListener('deviceorientation', (event) => this.handleOrientation(event));
    }

    handleOrientation(event) {
        if (!this.isGameActive || this.isPaused || this.flipCooldown) return;

        const beta = event.beta; // Front-to-back tilt (-180 to 180)
        const gamma = event.gamma; // Left-to-right tilt (-90 to 90)

        // Debug logging (will be visible in browser console)
        if (Math.random() < 0.1) { // Log 10% of the time to avoid spam
            console.log('Beta:', beta, 'Gamma:', gamma);
        }

        // Flip down (face down) - Correct answer
        // Phone tilted forward significantly (face down position)
        if (beta > this.flipThreshold && Math.abs(gamma) < 90) {
            this.handleCorrect();
        }
        // Flip up (face up) - Pass
        // Phone tilted backward significantly (face up position)
        else if (beta < -this.flipThreshold + 20 && Math.abs(gamma) < 90) {
            this.handlePass();
        }
    }

    populateCategories() {
        const grid = document.getElementById('category-grid');
        grid.innerHTML = '';

        Object.keys(WORD_CATEGORIES).forEach(key => {
            const category = WORD_CATEGORIES[key];
            const card = document.createElement('button');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <div>${category.name}</div>
            `;
            card.addEventListener('click', () => this.selectCategory(key));
            grid.appendChild(card);
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;

        // Lock orientation to landscape for gameplay
        if (screenId === 'gameplay') {
            this.lockOrientation('landscape');
        } else {
            this.unlockOrientation();
        }
    }

    async lockOrientation(mode) {
        try {
            if (screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock(mode);
            }
        } catch (err) {
            console.log('Orientation lock not supported');
        }
    }

    unlockOrientation() {
        try {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        } catch (err) {
            console.log('Orientation unlock not supported');
        }
    }

    async selectCategory(categoryKey) {
        this.selectedCategory = categoryKey;

        // Request permission if needed
        if (this.needsPermission) {
            const granted = await this.requestDeviceOrientation();
            if (!granted) return;
        }

        this.startCountdown();
    }

    startCountdown() {
        this.showScreen('countdown');
        const countdownText = document.getElementById('countdown-text');

        const sequence = ['Ready?', '3', '2', '1', 'GO!'];
        let index = 0;

        const showNext = () => {
            if (index < sequence.length) {
                countdownText.textContent = sequence[index];
                countdownText.style.animation = 'none';
                setTimeout(() => {
                    countdownText.style.animation = 'pulse 0.5s ease-in-out';
                }, 10);

                this.vibrate(100);
                this.playSound('beep');

                index++;

                if (index < sequence.length) {
                    setTimeout(showNext, 1000);
                } else {
                    setTimeout(() => this.startGame(), 500);
                }
            }
        };

        showNext();
    }

    startGame() {
        // Initialize game state
        const category = WORD_CATEGORIES[this.selectedCategory];
        this.currentWords = shuffleArray(category.words);
        this.currentWordIndex = 0;
        this.score = 0;
        this.passCount = 0;
        this.totalWords = 0;
        this.timeRemaining = this.settings.timerDuration;
        this.isPaused = false;
        this.isGameActive = true;

        // Show first word
        this.showScreen('gameplay');

        // Initialize timer display
        document.getElementById('timer-seconds').textContent = this.settings.timerDuration;
        document.getElementById('timer-display').classList.remove('warning');
        document.getElementById('timer-bar').classList.remove('warning');

        // Initialize score display
        this.updateScore();

        this.displayWord();
        this.startTimer();

        // Acquire wake lock
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').then(lock => {
                this.wakeLock = lock;
            }).catch(err => console.log('Wake lock error:', err));
        }
    }

    displayWord() {
        if (this.currentWordIndex >= this.currentWords.length) {
            // Reshuffle if we run out
            this.currentWords = shuffleArray(this.currentWords);
            this.currentWordIndex = 0;
        }

        const word = this.currentWords[this.currentWordIndex];
        document.getElementById('word-display').textContent = word;
    }

    startTimer() {
        const timerBar = document.getElementById('timer-bar');
        const timerDisplay = document.getElementById('timer-display');
        const timerSeconds = document.getElementById('timer-seconds');
        const startTime = Date.now();
        const duration = this.settings.timerDuration * 1000;

        this.timer = setInterval(() => {
            if (this.isPaused) return;

            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            this.timeRemaining = Math.ceil(remaining / 1000);

            const percentage = (remaining / duration) * 100;
            timerBar.style.width = percentage + '%';

            // Update timer display
            timerSeconds.textContent = this.timeRemaining;

            // Warning in last 10 seconds
            if (this.timeRemaining <= 10) {
                if (!timerBar.classList.contains('warning')) {
                    timerBar.classList.add('warning');
                    timerDisplay.classList.add('warning');
                    this.playSound('warning');
                }
            }

            if (remaining <= 0) {
                this.endGame();
            }
        }, 100);
    }

    handleCorrect() {
        if (this.flipCooldown) return;

        this.score++;
        this.totalWords++;
        this.currentWordIndex++;

        this.updateScore();
        this.displayWord();
        this.showFeedback('correct');
        this.vibrate(200);
        this.playSound('correct');

        this.setFlipCooldown();
    }

    handlePass() {
        if (this.flipCooldown) return;

        this.passCount++;
        this.totalWords++;
        this.currentWordIndex++;

        this.updateScore();
        this.displayWord();
        this.showFeedback('pass');
        this.vibrate(100);
        this.playSound('pass');

        this.setFlipCooldown();
    }

    setFlipCooldown() {
        this.flipCooldown = true;
        setTimeout(() => {
            this.flipCooldown = false;
        }, 800);
    }

    updateScore() {
        document.getElementById('score-counter').textContent = this.score;
        document.getElementById('pass-counter').textContent = this.passCount;
    }

    showFeedback(type) {
        // Flash background
        const flash = document.createElement('div');
        flash.className = `feedback-flash ${type}`;
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 300);

        // Show action indicator
        const indicator = document.getElementById('action-indicator');
        indicator.textContent = type === 'correct' ? '✓ Correct!' : '→ Pass';
        indicator.className = `action-indicator ${type} show`;

        setTimeout(() => {
            indicator.classList.remove('show');
        }, 600);
    }

    pauseGame() {
        this.isPaused = true;
        this.showScreen('pause');
    }

    resumeGame() {
        this.isPaused = false;
        this.showScreen('gameplay');
    }

    quitGame() {
        this.endGame(true);
    }

    endGame(quit = false) {
        this.isGameActive = false;
        this.isPaused = false;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // Release wake lock
        if (this.wakeLock) {
            this.wakeLock.release();
            this.wakeLock = null;
        }

        if (!quit) {
            this.showResults();
        } else {
            this.showScreen('main-menu');
        }
    }

    showResults() {
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('results-passed').textContent = this.passCount;
        document.getElementById('results-total').textContent = this.totalWords;

        this.showScreen('results');
        this.playSound('finish');
    }

    playAgain() {
        this.startCountdown();
    }

    vibrate(duration) {
        if (this.settings.vibration && 'vibrate' in navigator) {
            navigator.vibrate(duration);
        }
    }

    playSound(type) {
        if (!this.settings.sound) return;

        // Using Web Audio API to generate simple beeps
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch(type) {
            case 'beep':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.3;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'correct':
                oscillator.frequency.value = 1000;
                gainNode.gain.value = 0.3;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.15);
                break;
            case 'pass':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'warning':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.3;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'finish':
                oscillator.frequency.value = 523.25; // C note
                gainNode.gain.value = 0.3;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
                break;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PhoneFlipGame();
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

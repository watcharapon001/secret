const message = `Dear Babe,

Happy Valentine's Day! ❤️

I just want to take a moment to say thank you — for being by my side, for understanding me, and for loving me in the way that you do.

You make my life feel calmer, brighter, and more meaningful every single day. Even on the days that aren’t easy, having you beside me makes everything better.

Thank you for your patience, your warmth, and your constant support. I truly appreciate you more than words can fully express.

Wishing you a day filled with love, comfort, and all the happiness you deserve.

Yours truly,
Watcharaphon`;

const typewriterElement = document.getElementById('typewriter');
const overlay = document.getElementById('overlay');
const content = document.getElementById('content');
const musicToggle = document.getElementById('music-toggle');
let isPlaying = false;
let player;

// Load YouTube Iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'ks7p6DA0dKk', // Three Man Down - Khang Kan
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'loop': 1,
            'playlist': 'ks7p6DA0dKk' // Required for loop to work
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready, but we wait for user interaction to play
}

// Audio Toggle
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        player.pauseVideo();
        musicToggle.textContent = '🔇';
    } else {
        player.playVideo();
        musicToggle.textContent = '🎵';
    }
    isPlaying = !isPlaying;
});

// Start Experience
const passcodeContainer = document.getElementById('passcode-container');
const passcodeInput = document.getElementById('passcode-input');
const passcodeSubmit = document.getElementById('passcode-submit');
const passcodeError = document.getElementById('passcode-error');
const instruction = document.querySelector('.instruction');
const envelope = document.querySelector('.envelope-wrapper');

// 1. Click Envelope -> Show Passcode
overlay.addEventListener('click', (e) => {
    // Prevent triggering if clicking inside the input container
    if (e.target.closest('#passcode-container')) return;

    // If we haven't shown passcode yet
    if (passcodeContainer.classList.contains('hidden')) {
        passcodeContainer.classList.remove('hidden');
        instruction.classList.add('hidden');
        envelope.style.animation = 'none'; // Stop bouncing
        passcodeInput.focus();
    }
});

// 2. Submit Passcode
passcodeSubmit.addEventListener('click', verifyPasscode);
passcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyPasscode();
});

function verifyPasscode() {
    const code = passcodeInput.value;
    if (code === '01062560') {
        openEnvelope();
    } else {
        passcodeError.classList.remove('hidden');
        passcodeInput.classList.add('is-invalid');
        shakeElement(passcodeContainer);
    }
}

function shakeElement(element) {
    element.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], {
        duration: 300,
        iterations: 1
    });
}

function openEnvelope() {
    passcodeContainer.classList.add('hidden');
    instruction.classList.add('hidden');

    // 1. Animate Envelope Opening
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');
    wrapper.style.animation = 'none'; // Stop bouncing

    // 2. Wait for animation, then fade out overlay
    setTimeout(() => {
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.classList.add('hidden');
            content.classList.remove('hidden');
            content.classList.add('fade-in-animation');

            // Try to play audio
            if (player && player.playVideo) {
                player.playVideo();
                player.setVolume(50); // Set reasonable volume
                isPlaying = true;
            } else {
                console.log("Player not ready yet");
            }

            startTyping();
            startHearts();
        }, 1000); // 1s fade out
    }, 1000); // Wait 1s for flap to open
}

// Typewriter Effect
function startTyping() {
    let index = 0;
    const speed = 50; // ms per char

    function type() {
        if (index < message.length) {
            // Handle newlines
            if (message.charAt(index) === '\n') {
                typewriterElement.innerHTML += '<br>';
            } else {
                typewriterElement.innerHTML += message.charAt(index);
            }
            index++;
            setTimeout(type, speed);
        } else {
            // Typing finished, show the burst button
            setTimeout(() => {
                document.getElementById('burst-button-container').classList.remove('opacity-0');
            }, 1000);
        }
    }
    type();
}

// Floating Hearts & Images
function startHearts() {
    setInterval(createFloatingElement, 300);
}

const assetImages = [
    'IMG_3214.jpg',
    'IMG_4437.jpg',
    'IMG_7285.jpg',
    'IMG_7402.jpg',
    'IMG_7747.jpg',
    'IMG_8167.jpg'
];

function createFloatingElement() {
    const isImage = Math.random() < 0.3; // 30% chance to show image
    const container = document.getElementById('hearts-container');
    const element = document.createElement(isImage ? 'img' : 'div');

    if (isImage) {
        const randomImage = assetImages[Math.floor(Math.random() * assetImages.length)];
        element.src = `asset/${randomImage}`;
        element.classList.add('floating-image');
    } else {
        element.classList.add('heart');
        element.innerHTML = Math.random() < 0.5 ? '❤️' : '💖';
    }

    // Random position and size
    element.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 20 + 20;

    if (isImage) {
        element.style.width = size + 20 + 'px'; // Making images slightly larger
        element.style.height = size + 20 + 'px';
    } else {
        element.style.fontSize = size + 'px';
    }

    // Random animation duration
    const duration = Math.random() * 3 + 4; // 4s to 7s
    element.style.animationDuration = duration + 's';

    container.appendChild(element);

    // Cleanup
    setTimeout(() => {
        element.remove();
    }, duration * 1000);
}

// Heart Burst Feature
const burstBtn = document.getElementById('heart-burst-btn');

burstBtn.addEventListener('click', () => {
    // Create 30 hearts
    for (let i = 0; i < 30; i++) {
        createBurstHeart();
    }

    // Animate button click
    burstBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        burstBtn.style.transform = 'scale(1)';
    }, 100);
});

function createBurstHeart() {
    const heart = document.createElement('div');
    heart.classList.add('burst-heart');
    heart.innerHTML = Math.random() < 0.5 ? '❤️' : '💖';

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100; // Distance to travel

    const tx = Math.cos(angle) * velocity + 'px';
    const ty = Math.sin(angle) * velocity + 'px'; // Move up (negative y) more likely? No, pure burst is fine.

    // Set custom properties for CSS animation
    heart.style.setProperty('--tx', `calc(-50% + ${tx})`);
    heart.style.setProperty('--ty', `calc(-50% + ${ty})`);

    // Randomize appearance
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';

    // Animation
    const duration = Math.random() * 1 + 0.5; // 0.5s to 1.5s
    heart.style.animation = `burstMove ${duration}s ease-out forwards`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

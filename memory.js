const buttons = document.querySelectorAll('.button');
const messageDisplay = document.getElementById('message');
const highScoreDisplay = document.getElementById('high-score');
const startButton = document.getElementById('start-button');
const octaveToggle = document.getElementById('octave-toggle');

let gameStarted = false;
let sequence = [];
let playerIndex = 0;
let currentOscillator;

// Audio context is NOT initialized here
let audioCtx;

const noteFrequencies = {
    "C": 261.63,
    "C#": 277.18,
    "D": 293.66,
    "D#": 311.13,
    "E": 329.63,
    "F": 349.23,
    "F#": 369.99,
    "G": 392.00,
    "G#": 415.30,
    "A": 440.00,
    "A#": 466.16,
    "B": 493.88
};

let randomOctave = false;
let highScore = getCookie("highScore") || 0;
updateHighScoreDisplay();

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function updateHighScoreDisplay() {
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}

function playSound(note) {
    // Check if audio context exists before using it
    if (!audioCtx) {
        console.error("Audio context not initialized.");
        return;
    }

    if (currentOscillator) {
        currentOscillator.stop();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    currentOscillator = oscillator;
    let frequency = noteFrequencies[note];

    if (randomOctave) {
        const octaveShift = Math.floor(Math.random() * 4) - 1;
        frequency *= Math.pow(2, octaveShift);
    }

    if (noteFrequencies.hasOwnProperty(note)) {
        oscillator.frequency.value = frequency;

        // Adjust gain for fade-in, sustain, fade-out
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.001);
        gainNode.gain.setValueAtTime(1, audioCtx.currentTime + 0.490);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.510);
    } else {
        console.error("Invalid note:", note);
    }
}

function lightUpButton(index) {
    const button = buttons[index];
    button.classList.add('lit');
    playSound(button.dataset.note);
    setTimeout(() => button.classList.remove('lit'), 500);
}

function playSequence() {
    playerIndex = 0;
    buttons.forEach(button => button.disabled = true);

    sequence.forEach((index, delay) => {
        setTimeout(() => {
            lightUpButton(index);
            if (delay === sequence.length - 1) {
                setTimeout(() => {
                    buttons.forEach(button => button.disabled = false);
                    messageDisplay.textContent = "Your turn!";
                }, 500);
            }
        }, delay * 1000);
    });
}

function checkInput(buttonIndex) {
    if (buttonIndex === sequence[playerIndex]) {
        playerIndex++;
        if (playerIndex === sequence.length) {
            setTimeout(() => {
                sequence.push(Math.floor(Math.random() * buttons.length));
                messageDisplay.textContent = `Level ${sequence.length}`;
                playSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    gameStarted = false;

    buttons.forEach(button => {
        button.disabled = true;
        button.onclick = null;
    });

    setTimeout(() => {
        currentOscillator?.stop();
        const frequencies = [523.25, 440, 350, 260, 175];
        frequencies.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioCtx.createOscillator();
                oscillator.type = 'triangle';
                oscillator.frequency.value = frequency;
                oscillator.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.2);
            }, index * 200);
        });
    }, 900);

    messageDisplay.textContent = `Game Over! Final Level: ${sequence.length - 1}`;
}

function startGame() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // Start audio context
    gameStarted = true;
    sequence = [];
    messageDisplay.textContent = "Watch the sequence!";
    setTimeout(() => {
        sequence.push(Math.floor(Math.random() * buttons.length));
        playSequence();
    }, 1000);

    buttons.forEach((button, index) => {
        button.disabled = true;
        button.onclick = () => {
            lightUpButton(index);
            if (gameStarted) {
                checkInput(index);
            }
        };
    });
}

buttons.forEach(button => button.disabled = true);

startButton.addEventListener('click', startGame);
octaveToggle.addEventListener('change', () => {
    randomOctave = octaveToggle.checked;
});

const buttons = document.querySelectorAll('.button');
const messageDisplay = document.getElementById('message');
const highScoreDisplay = document.getElementById('high-score');
const startButton = document.getElementById('start-button');
const octaveToggle = document.getElementById('octave-toggle');
const randomOrderToggle = document.getElementById('random-order-toggle');

let gameStarted = false;
let sequence = [];
let playerIndex = 0;
let currentOscillator;
let audioCtx;

// Note frequencies (middle octave)
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

// Note Labels (original order)
const noteLabels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playSequence() {
    playerIndex = 0;
    buttons.forEach(button => button.disabled = true);

    // Shuffle the order of buttons in the grid only if random order is enabled
    if (randomOrderToggle.checked) {
        const shuffledButtons = Array.from(buttons);
        shuffleArray(shuffledButtons);
        shuffledButtons.forEach(button => button.parentNode.appendChild(button));
    }

    sequence.forEach((index, delay) => {
        setTimeout(() => {
            let noteIndex = index;
            noteIndex = Array.from(buttons).findIndex(btn => btn.dataset.note === noteLabels[index]);
            lightUpButton(noteIndex);
            if (delay === sequence.length - 1) {
                setTimeout(() => {
                    buttons.forEach(button => button.disabled = false);
                    if (randomOrderToggle.checked) {
                        const shuffledButtons = Array.from(buttons);
                        shuffleArray(shuffledButtons);
                        shuffledButtons.forEach(button => button.parentNode.appendChild(button));
                    }
                    messageDisplay.textContent = "Your turn!";

                }, 1000);
            }
        }, delay * 1000 + 500);
    });
}


function checkInput(buttonIndex) {
    const buttonNote = buttons[buttonIndex].dataset.note;
    if (buttonNote === noteLabels[sequence[playerIndex]]) {
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
    }, 1000);

    messageDisplay.textContent = `Game Over! Final Level: ${sequence.length - 1}`;
}

function startGame() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gameStarted = true;
     startButton.classList.remove('wiggle'); // Remove the 'wiggle' class to stop the animation
    sequence = [];
    messageDisplay.textContent = "Watch the sequence!";
    setTimeout(() => {
        sequence.push(Math.floor(Math.random() * buttons.length));
        playSequence();
    }, 1000);

    buttons.forEach((button, index) => {
        button.disabled = false;
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

randomOrderToggle.addEventListener('change', () => {
    if (randomOrderToggle.checked) {
        const shuffledButtons = Array.from(buttons);
        shuffleArray(shuffledButtons);
        shuffledButtons.forEach(button => button.parentNode.appendChild(button));
    }
});

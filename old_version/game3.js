// import Parser
// Variables for game elements
const rocket = document.querySelector('.rocket');
const clouds = document.querySelectorAll('.cloud');
const staticCloud = document.querySelector('.cloud-static');
const fallingNumbers = document.querySelector('.falling-numbers');
const scoreDisplay = document.querySelector('.score');
const livesDisplay = document.querySelector('.lives');
const usernameDisplay = document.getElementById('usernameDisplay');

// Get the username and other details from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const operation = urlParams.get('operation');
const timesTable = urlParams.get('timesTable');

// Initialize game variables
let score = 0;
let lives = 4;

// Update the header bar with the user details
usernameDisplay.textContent = `Username: ${username}`;

// Function to generate random addition, subtraction, multiplication, or division equation
function generateRandomEquation() {
    const number1 = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
    let number2;
    switch (operation) {
        case 'add':
            number2 = Math.floor(Math.random() * 10) + 1;
            return `${number1} + ${number2}`;
        case 'subtract':
            number2 = Math.floor(Math.random() * 10) + 1;
            return `${number1} - ${number2}`;
        case 'multiply':
            number2 = Math.floor(Math.random() * 10) + 1;
            return `${number1} * ${number2}`;
        case 'divide':
            do {
                number2 = Math.floor(Math.random() * 10) + 1;
            } while (number2 === 0); // Generate a non-zero number for division
            return `${number1} / ${number2}`;
        default:
            // Default to addition if no valid operation is provided
            return `${number1} + ${number2}`;
    }
}
const randomEquation = generateRandomEquation();

// Update the static cloud with the chosen operation
function updateStaticCloud() {
    switch (operation) {
        case 'add':
            staticCloud.textContent = '+';
            break;
        case 'subtract':
            staticCloud.textContent = '-';
            break;
        case 'multiply':
            staticCloud.textContent = '*';
            break;
        case 'divide':
            staticCloud.textContent = '/';
            break;
        default:
            staticCloud.textContent = '+'; // Default to addition if no valid operation is provided
            break;
    }
}

// Update the static cloud with the chosen operation
updateStaticCloud();

// Function to update the falling numbers with new random numbers
function updateFallingNumbers() {
    fallingNumbers.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const numberSpan = document.createElement('span');
        numberSpan.textContent = randomNumber;
        fallingNumbers.appendChild(numberSpan);
    }
}

// Function to update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to update the lives display
function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

// Function to check if the rocket touches the correct answer
function checkCollision() {
    const rocketRect = rocket.getBoundingClientRect();
    const numbers = fallingNumbers.children;

    for (const number of numbers) {
        const numberRect = number.getBoundingClientRect();

        // Check for collision
        if (
            rocketRect.left < numberRect.right &&
            rocketRect.right > numberRect.left &&
            rocketRect.top < numberRect.bottom &&
            rocketRect.bottom > numberRect.top
        ) {
            const chosenNumber = clouds[0].textContent; // Get the chosen times table
            const currentNumber = number.textContent;

            // Check if the rocket touched the correct answer
            if (parse(randomEquation)==parseInt(number.textContent)) {
            // if (parseInt(chosenNumber) * parseInt(currentNumber) === parseInt(number.textContent)) {
                score += 1;
            } else {
                lives -= 1;
            }

            number.remove();

            // Update displays
            updateScore();
            updateLives();
        }
    }
}

// Event listener for arrow key press to move the rocket
document.addEventListener('keydown', (e) => {
    const rocketRect = rocket.getBoundingClientRect();

    if (e.key === 'ArrowLeft' && rocketRect.left > 0) {
        rocket.style.left = `${rocketRect.left - 20}px`; // Increase the distance for left movement
    } else if (e.key === 'ArrowRight' && rocketRect.right < window.innerWidth) {
        rocket.style.left = `${rocketRect.left + 20}px`; // Increase the distance for right movement
    } else if (e.key === 'ArrowUp' && rocketRect.top > 0) {
        rocket.style.top = `${rocketRect.top - 20}px`; // Increase the distance for upward movement
    } else if (e.key === 'ArrowDown' && rocketRect.bottom < window.innerHeight) {
        rocket.style.top = `${rocketRect.top + 20}px`; // Increase the distance for downward movement
    }
});

// Function to start the game loop
function startGame() {
    updateFallingNumbers();
    checkCollision();
    setTimeout(startGame, 100); // Run the game loop every 100ms
}

// Start the game
startGame();

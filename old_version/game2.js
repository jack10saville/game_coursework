// JavaScript

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

// Update the header bar with the user details
usernameDisplay.textContent = `Username: ${username}`;

// Function to generate random addition, subtraction, multiplication, or division equation
function generateRandomEquation() {
    const number1 = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
    const number2 = Math.floor(Math.random() * 10) + 1;
    let equation = '';

    switch (operation) {
        case 'add':
            equation = `${number1} + ${number2}`;
            break;
        case 'subtract':
            equation = `${number1} - ${number2}`;
            break;
        case 'multiply':
            equation = `${number1} * ${number2}`;
            break;
        case 'divide':
            equation = `${number1 * number2} / ${number2}`;
            break;
        default:
            equation = `${number1} + ${number2}`; // Default to addition if no valid operation is provided
    }

    return equation;
}

// Update the static cloud with random equations based on the user's chosen operation
const staticCloudEquations = [generateRandomEquation(), generateRandomEquation(), generateRandomEquation()];
staticCloud.textContent = staticCloudEquations.join(' | ');

// Initialize game variables
let score = 0;
let lives = 4;

// Rest of the game code...
// (Include the code to move the rocket and other game mechanics here)

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Update lives display
function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

// Function to check if rocket touches the correct answer
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
            if (parseInt(chosenNumber) * parseInt(currentNumber) === parseInt(number.textContent)) {
                score += 1;
                number.remove();
            } else {
                lives -= 1;
                number.remove();
            }

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

// Start the game loop
setInterval(() => {
    checkCollision();
}, 100);

// Add more functionality and improvements as needed

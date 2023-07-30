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

// Get the selected operation from localStorage
const operation = localStorage.getItem('operation');

// Update the header bar with the user details
usernameDisplay.textContent = `Username: ${username}`;

// Event listener for arrow key press to move the rocket
document.addEventListener('keydown', (e) => {
    const rocketRect = rocket.getBoundingClientRect();
    const rocketSpeed = 20;

    if (e.key === 'ArrowLeft' && rocketRect.left > 0) {
        rocket.style.left = `${rocketRect.left - rocketSpeed}px`;
    } else if (e.key === 'ArrowRight' && rocketRect.right < window.innerWidth) {
        rocket.style.left = `${rocketRect.left + rocketSpeed}px`;
    } else if (e.key === 'ArrowUp' && rocketRect.top > 0) {
        rocket.style.top = `${rocketRect.top - rocketSpeed}px`;
    } else if (e.key === 'ArrowDown' && rocketRect.bottom < window.innerHeight) {
        rocket.style.top = `${rocketRect.top + rocketSpeed}px`;
    } else if (e.key === 'PageUp' && rocketRect.top > 0 && rocketRect.left > 0) {
        rocket.style.top = `${rocketRect.top - rocketSpeed}px`;
        rocket.style.left = `${rocketRect.left - rocketSpeed}px`;
    } else if (e.key === 'PageDown' && rocketRect.bottom < window.innerHeight && rocketRect.right < window.innerWidth) {
        rocket.style.top = `${rocketRect.top + rocketSpeed}px`;
        rocket.style.left = `${rocketRect.left + rocketSpeed}px`;
    } else if (e.key === 'Home' && rocketRect.top > 0 && rocketRect.right < window.innerWidth) {
        rocket.style.top = `${rocketRect.top - rocketSpeed}px`;
        rocket.style.left = `${rocketRect.left + rocketSpeed}px`;
    } else if (e.key === 'End' && rocketRect.bottom < window.innerHeight && rocketRect.left > 0) {
        rocket.style.top = `${rocketRect.top + rocketSpeed}px`;
        rocket.style.left = `${rocketRect.left - rocketSpeed}px`;
    }
});

function generateRandomEquation() {
    const number1 = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
    const number2 = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10

    switch (operation) {
        case 'add':
            return `${number1} + ${number2}`;
        case 'subtract':
            return `${number1} - ${number2}`;
        case 'multiply':
            return `${number1} × ${number2}`; // Use "×" symbol for multiplication
        case 'divide':
            return `${number1} / ${number2}`;
        default:
            // Default to addition if no valid operation is provided
            return `${number1} + ${number2}`;
    }
}

// Update the static cloud with a random equation based on the user's chosen operation
staticCloud.textContent = generateRandomEquation();

// ... (other code remains unchanged)

// Function to update the falling numbers with new random numbers
function updateFallingNumbers() {
    fallingNumbers.innerHTML = '';
    const randomNumbers = []; // Array to store random numbers, including the answer
    const answerIndex = Math.floor(Math.random() * 3); // Index for placing the answer in randomNumbers array

    // Get the answer from the static cloud expression
    const answer = eval(staticCloud.textContent);

    for (let i = 0; i < 3; i++) {
        if (i === answerIndex) {
            // Add the answer to the equation to the array
            randomNumbers.push(answer);
        } else {
            // Add other random numbers to the array
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 10) + 1;
            } while (randomNumber === answer); // Make sure the random number is not the same as the answer
            randomNumbers.push(randomNumber);
        }

        const numberSpan = document.createElement('span');
        numberSpan.textContent = randomNumbers[i];
        fallingNumbers.appendChild(numberSpan);
    }
}

// ... (other code remains unchanged)


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
            if (parseInt(chosenNumber) * parseInt(currentNumber) === parseInt(number.textContent)) {
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

// Function to start the game loop
function startGame() {
    updateFallingNumbers();
    checkCollision();
    setTimeout(startGame, 100); // Run the game loop every 100ms
}

// Start the game
startGame();

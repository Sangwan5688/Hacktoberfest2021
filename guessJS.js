function guessTheNumber() {
    const secretNumber = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
    let attempts = 0;
    const maxAttempts = 7;  // You can change the number of attempts

    alert("Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\nYou have " + maxAttempts + " attempts to guess it.");

    while (attempts < maxAttempts) {
        const guess = parseInt(prompt("Attempt " + (attempts + 1) + ": Enter your guess:"));

        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Please enter a valid number between 1 and 100.");
            continue;
        }

        attempts++;

        if (guess < secretNumber) {
            alert("Too low! Try again.");
        } else if (guess > secretNumber) {
            alert("Too high! Try again.");
        } else {
            alert("Congratulations! You've guessed the number (" + secretNumber + ") in " + attempts + " attempts.");
            return;
        }
    }

    alert("Sorry, you've run out of attempts. The secret number was " + secretNumber + ".");
}

guessTheNumber();

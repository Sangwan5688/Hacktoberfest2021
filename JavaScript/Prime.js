function isPrime(number) {
    // Check if the number is less than 2 (not prime)
    if (number <= 1) {
        return false;
    }
    
    // Check for divisibility from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false; // Found a divisor, not prime
        }
    }
    
    return true; // If no divisors found, the number is prime
}

// Example usage:
const numberToCheck = 17; // Change this to the number you want to check
if (isPrime(numberToCheck)) {
    console.log(numberToCheck + " is a prime number.");
} else {
    console.log(numberToCheck + " is not a prime number.");
}

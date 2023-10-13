function findGCD(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

const num1 = parseInt(prompt("Enter the first positive integer:"));
const num2 = parseInt(prompt("Enter the second positive integer:"));

const gcd = findGCD(num1, num2);

console.log(`The Greatest Common Divisor (GCD) of ${num1} and ${num2} is: ${gcd}`);

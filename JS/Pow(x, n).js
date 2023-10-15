function power(base, exponent) {
    if (exponent === 0) {
        return 1.0;
    } else if (exponent < 0) {
        base = 1.0 / base;
        exponent = -exponent;
    }

    let result = 1.0;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

const base = 2.0;
const exponent = 3;

const result = power(base, exponent);

console.log(`${base} raised to the power of ${exponent} is ${result}`);

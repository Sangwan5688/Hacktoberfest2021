#include <iostream>

double power(double base, int exponent) {
    if (exponent == 0) {
        return 1.0;
    } else if (exponent < 0) {
        base = 1.0 / base;
        exponent = -exponent;
    }

    double result = 1.0;
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

int main() {
    double base = 2.0;
    int exponent = 3;

    double result = power(base, exponent);

    std::cout << base << " raised to the power of " << exponent << " is " << result << std::endl;

    return 0;
}

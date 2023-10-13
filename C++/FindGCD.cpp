#include <iostream>

int findGCD(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int num1, num2;

    std::cout << "Enter the first positive integer: ";
    std::cin >> num1;

    std::cout << "Enter the second positive integer: ";
    std::cin >> num2;

    int gcd = findGCD(num1, num2);

    std::cout << "The Greatest Common Divisor (GCD) of " << num1 << " and " << num2 << " is: " << gcd << std::endl;

    return 0;
}

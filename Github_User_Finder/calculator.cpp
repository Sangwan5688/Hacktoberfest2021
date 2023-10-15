#include <iostream>

int main() {
    double num1, num2, result;
    char op;

    std::cout << "Enter first number: ";
    std::cin >> num1;

    std::cout << "Enter an operator (+, -, *, /): ";
    std::cin >> op;

    std::cout << "Enter second number: ";
    std::cin >> num2;

    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                std::cerr << "Error: Division by zero is not allowed." << std::endl;
                return 1;
            }
            break;
        default:
            std::cerr << "Error: Invalid operator." << std::endl;
            return 1;
    }

    std::cout << "Result: " << num1 << " " << op << " " << num2 << " = " << result << std::endl;

    return 0;
}

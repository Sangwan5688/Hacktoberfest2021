#include <iostream>
#include <cmath>

using namespace std;

// Function to check if a number is an Armstrong number
bool isArmstrong(int number) {
    int originalNumber, remainder, result = 0;
    int n = number;

    originalNumber = number;

    int numDigits = 0;
    while (originalNumber != 0) {
        originalNumber /= 10;
        numDigits++;
    }

    originalNumber = number;

    while (originalNumber != 0) {
        remainder = originalNumber % 10;
        result += pow(remainder, numDigits);
        originalNumber /= 10;
    }

    return result == n;
}

int main() {
    int numberToCheck;
    cout << "Enter a number: ";
    cin >> numberToCheck;

    if (isArmstrong(numberToCheck)) {
        cout << numberToCheck << " is an Armstrong number." << endl;
    } else {
        cout << numberToCheck << " is not an Armstrong number." << endl;
    }

    return 0;
}

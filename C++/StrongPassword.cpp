#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>

using namespace std;

// Define character sets for generating passwords
const string lowercase = "abcdefghijklmnopqrstuvwxyz";
const string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const string numbers = "0123456789";
const string specialChars = "!@#$%^&*()_+";

string generatePassword(int length) {
    const string allChars = lowercase + uppercase + numbers + specialChars;
    const int charSetSize = allChars.length();

    if (length < 8 || length > 20) {
        cerr << "Password length should be between 8 and 20 characters." << endl;
        return "";
    }

    string password;
    password.reserve(length);

    for (int i = 0; i < length; i++) {
        password += allChars[rand() % charSetSize];
    }

    return password;
}

int main() {
    srand(static_cast<unsigned>(time(0));

    int passwordLength;
    cout << "Enter the desired password length (8-20 characters): ";
    cin >> passwordLength;

    string password = generatePassword(passwordLength);
    cout << "Generated Password: " << password << endl;

    return 0;
}

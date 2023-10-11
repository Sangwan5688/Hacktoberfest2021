#include <iostream>
using namespace std;

int main() {
	int year;

	cout << "Enter the year you want to check: ";
	cin >> year;

	if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
		cout << "The year you entered is a leap year";
	}
	else {
		cout << "The year you entered is not a leap year.";
	}
}

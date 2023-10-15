// C++ program to demonstrate the bitset 
#include <bitset>
#include <iostream>

using namespace std;

int main()
{
	// declaring an uninitialized bitset object
	bitset<8> uninitializedBitset;

	// initialization with decimal number
	bitset<8> decimalBitset(15);

	// initialization with binary string
	bitset<8> stringBitset(string("1111"));

	cout << "Uninitialized bitset: " << uninitializedBitset
		<< endl;
	cout << "Initialized with decimal: " << decimalBitset
		<< endl;
	cout << "Initialized with string: " << stringBitset
		<< endl;

	return 0;
}

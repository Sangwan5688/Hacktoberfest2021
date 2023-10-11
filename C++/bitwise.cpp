#include <iostream>
using namespace std;

int main() {
	int a,b;
  cout<<"enter the numbers";
  cin>>a>>b;

	cout<<"a = " << a <<","<< " b = " << b;
	cout << "a & b = " << (a & b);


	cout << "a | b = " << (a | b);

	cout << "a ^ b = " << (a ^ b);

	cout << "~(" << a << ") = " <<(~a);

	return 0;
}



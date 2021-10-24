#include <iostream>
using namespace std;

int main() {
	int total = 0;
	int count = 0;
	int number;
	
	cout<<"Write your number (Write -1 if you done) :"<<endl;
	while (number != -1) 
	{
		cin>>number;
		total = total + number;
		count++;
	}
	count--;
	total++;
	cout<<"The number of data read is "<<count<<endl;
	cout<<"The sum of the number entered is "<<total;
	return 0;
}

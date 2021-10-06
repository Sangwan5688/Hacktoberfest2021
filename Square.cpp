#include <iostream>
using namespace std;

inline int square(int n)
{
	return n*n;
}

int main(){
	int n;
	cout<<"Enter a number to find its square : ";
	cin>>n;
	cout<<"Square of "<< n << " = "<<square(n);
	cout<<endl;
	return 0;
}

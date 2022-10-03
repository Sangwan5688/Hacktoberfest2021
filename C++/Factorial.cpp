#include<iostream>
using namespace std;

int factorial(int number) 
{
  	if(number==0) 
  	{
  		return 1;
  	}
  	else 
  	{
  		return (number * factorial(number-1));
  	}
}


//driver function
int main()
{
  int number;
  
  cout<<"Enter Last Number : ";
  cin>>number;
  cout<<"\nThe factorial of "<<number<<"  is : "<<factorial(number)<<endl;

  return 0;
}

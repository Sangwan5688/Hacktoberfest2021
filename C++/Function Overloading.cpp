//LAB 5 QA) Write a program to find Area of : a)Circle b)Rectangle c)Triangle. Use function overloading.

#include<iostream>
#include<math.h>
using namespace std;

void area(int r)
{
 	double a;
 	a= 3.14 *(r*r);
 	cout<<"Area of Circle ="<<a<<endl;
 }
void area(int l, int h)//take parameters as double
{
	float a;
	a= l*h;
	cout<<"Area of Rectangle ="<<a<<endl;
}
void area(float b, float hgt)
{
	float a;
	a =  (b*hgt)/2.0;
	cout<<"Area of Triangle ="<<a<<endl;
}
int main()
{
	int rc,length,base;
	float b,height;
	
	cout<<"Enter radius of circle :"<<endl;
	cin>>rc;
	cout<<"Enter length and base of Rectangle :"<<endl;
	cin>>length;
	cin>>base;
	cout<<"Enter base and height of Triangle :"<<endl;
	cin>>b;
	cin>>height;
	
	area(rc);
	area(length,base);
	area(b,height);
	
	return 0;
}

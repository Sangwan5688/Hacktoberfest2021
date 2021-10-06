#include<iostream.h>
class Base
{
public:
Base ( )
{
cout<< "Inside Base constructor" <<endl;
}
~Base ( )
{
cout<< "Inside Base destructor" <<endl;
}
};
class Derived : public Base
{
public:
Derived ( )
{
cout<< "Inside Derived constructor" <<endl;
}
~Derived ( )
{
cout<< "Inside Derived destructor" <<endl;
}
};
void main( )
{
Derived x;
} 

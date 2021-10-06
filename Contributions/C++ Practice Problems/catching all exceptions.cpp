#include<iostream.h>
#include<conio.h>
void test(int x)
{
try
{
if(x>0)
throw x;
else
throw 'x';
}
catch(int x)
{
cout<<"Catch a integer and that integer is:"<<x;
}
catch(char x)
{
cout<<"Catch a character and that character is:"<<x;
}
}
void main()
{
clrscr();
cout<<"Testing multiple catches\n:";
test(10);
test(0);
getch();
}  

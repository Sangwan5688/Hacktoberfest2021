/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>

using namespace std;
class calculator
{
    private :
        int num1,num2;
    public:
    void display_data(int a ,int b)
    {
        cout<<"The numbers are"<< a<<b<<endl;
        //cin>>num1>>num2;
    }
    void add(int a , int b)
    {
        int sum;
        sum=a+b;
        cout<<"The addition of the nubers is "<< sum<<endl;
    }
    void sub(int a, int b)
    {
        int sub;
        sub=a-b;
        cout<<"The substraction of the nubers is "<< sub<<endl;
    }
    void mul(int a, int b)
    {
        int mul;
        mul=a-b;
        cout<<"The multiplication of the nubers is "<< mul<<endl;
    }
    void divi(int a, int b)
    {
        int divi;
        divi=a/b;
        cout<<"The division of the nubers is "<< divi<<endl;
    }
};
int main()
{
    calculator c1;
    int o;
    int a,b;
    cout<<"Enter 1 for addition "<<endl<<"Enter 2 for substraction"<<endl<<"Enter 3 for multiplication"<<endl<<"Enter 4 for division"<<endl; 
    cin>>o;
    if(o==1)
    {
        c1.add(10,5);
    }
    else if(o==2)
    {
        c1.sub(10,5);
    }
    else if(o==3)
    {
        c1.mul(8,2);
    }
    else (o==4)
    {
        c1.divi(8,2);
        
        
    }
    return 0;
}

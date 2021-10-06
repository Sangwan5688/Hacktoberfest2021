/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>
using namespace std;
class account 
{
    public:
    float s1=60000;
    float s2=90000;
    float s3=100000;
};
class programmer:public account
{
    public:
    float b1 =5000;
    float b2 =5000;
    float b3=6000;
};
int main()
{
    programmer p1,p2,p3;
    cout<<"salary : "<< p1.s1<<endl;
    cout<<"Bonus : "<< p1.b1<<endl;
    cout<<"salary : "<< p2.s2<<endl;
    cout<<"salary : "<< p3.s3<<endl;
    cout<<"Bonus : "<< p2.b2<<endl;
    cout<<"Bonus : "<< p3.b3<<endl;
    return 0;
}

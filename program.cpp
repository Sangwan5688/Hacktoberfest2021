C++ Program to Add Two Time Objects using call by address
Add Two Time Objects using call by address

What are Functions ?
Function is a block of statements that performs some operations. All C++ programs have at least one function – function called “main()”. This function is entry-point of your program.


 

 
A function declaration tells the compiler about a function’s name, return type, and parameters. A function definition provides the actual body of the function.

Defining a Function : :
The general form of a C++ function definition is as follows:

return_type Function_Name( list of parameters )
{
//function’s body
}

return_type : suggests what the function will return. It can be void, int, char, some pointer or even a class object.
Function_Name : is the name of the function, using the function name it is called.
Parameters : are variables to hold values of arguments passed while function is called. A function may or may not contain parameter list.
Function body : is he part where the code statements are written.
Below is the source code for C++ Program to Add Two Time Objects using call by address which is successfully compiled and run on Windows System to produce desired output as shown below :


 
SOURCE CODE : :
/*  C++ Program to Add Two Time Objects using call by address  */

#include<iostream>
using namespace std;

class time
{
        int hr,min,sec;
        public:
                void get()
                {
                    cout<<"\nEnter Hour :: ";
                        cin>>hr;
                        cout<<"\nEnter Minutes :: ";
                        cin>>min;
                        cout<<"\nEnter Seconds :: ";
                        cin>>sec;
                }

                void disp()
                {
                        cout<<"[ "<<hr<<":"<<min<<":"<<sec<<" ] \n";

                }
                void sum(time *,time *);
};

void time::sum(time *t1,time *t2)
{
        sec=t1->sec+t2->sec;
        min=sec/60;
        sec=sec%60;
        min=min+t1->min+t2->min;
        hr=min/60;
        min=min%60;
        hr=hr+t1->hr+t2->hr;
}

int main()
{
        time t1,t2,t3;
        cout<<"\nEnter 1st time Details :: \n";
        t1.get();
        cout<<"\nEnter 2nd time Details :: \n";
        t2.get();
        cout<<"\nThe 1st time entered is :: ";
        t1.disp();
        cout<<"\nThe 2nd time entered is :: ";
        t2.disp();

        t3.sum(&t1,&t2);

        cout<<"\nThe Sum of two times are :: ";

        t3.disp();

        return 0;

}
OUTPUT : :
/*  C++ Program to Add Two Time Objects using call by address  */

Enter 1st time Details ::

Enter Hour :: 02

Enter Minutes :: 30

Enter Seconds :: 50

Enter 2nd time Details ::

Enter Hour :: 05

Enter Minutes :: 40

Enter Seconds :: 11

The 1st time entered is :: [ 2:30:50 ]

The 2nd time entered is :: [ 5:40:11 ]

The Sum of two times are :: [ 8:11:1 ]

Process returned 0

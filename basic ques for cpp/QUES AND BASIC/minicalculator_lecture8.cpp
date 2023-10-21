//mini calculator
#include<bits/stdc++.h>

using namespace std;
int main()
{
    int a,b;
    cout<<"enter first number : ";
    cin>>a;
    cout<<"enter second number : ";
    cin>>b;
    char operation;
    cout<<"enter the operation you want to perform : ";
    cin>>operation;
    switch (operation)
    {
        case '+' : cout<<a+b<<endl;
                break;
        
        case '-' : cout<<a-b<<endl;
                break;
        
        case '*' : cout<<a*b<<endl;
                break;

        case '/' : cout<<a/b<<endl;
                break;

        case '%' : cout<<a%b<<endl;
                break;
        default : cout<<"not a valid operation";
    }

}
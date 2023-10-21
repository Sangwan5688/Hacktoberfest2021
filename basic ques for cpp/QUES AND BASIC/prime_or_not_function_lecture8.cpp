//prime number using funciton 
#include<bits/stdc++.h>
using namespace std;
int isprime(int n)
{
    for(int i=2;i<n;i++)
    {
        if(n%i==0)
        {
            return 0;
        }
    }
    return 1;
}
int main()
{
    int n;
    cin>>n;

    if(isprime(n))
    {
        cout<<"prime number ";
    }else{
        cout<<"not a prime number ";
    }

    return 0;
}
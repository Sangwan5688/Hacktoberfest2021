//print nth term of fibonaci series
#include<bits/stdc++.h>
using namespace std;
int fib(int n)
{
    int a=0,b=1;
    int sum=0;
    for(int i=1;i<=n-2;i++)
    {
        sum=a+b;
        a=b;
        b=sum;

    }
    if(n==1)
    {
        cout<<"0";
    }else if(n==2)
    {
        cout<<"1";
    }else
    {
        cout<<sum;
    }

}
int main()
{
    int n;
    cin>>n;
    fib(n);
}
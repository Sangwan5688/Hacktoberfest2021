//nCr of the numbers
#include<bits/stdc++.h>
using namespace std;
int fac(int n)
{
    int fact=1;
    for(int i=1;i<=n;i++)
    {
        fact=fact*i;
    }
    return fact;
}

int ncr(int n, int r)
{
    int num=fac(n);
    
    int denom = fac(r)*fac(n-r);

    return num/denom;

}
int main()
{
    int a,b;
    cout<<"enter the numbers : ";
    cin>>a>>b;
    int ans=ncr(a,b);
    cout<<ans;

    return 0;
}
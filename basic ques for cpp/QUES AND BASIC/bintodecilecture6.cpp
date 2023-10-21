//binary to decimal
#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cin>>n;
    int ans=0;
    int i=0;
    while(n!=0)
    {
        int digit=n%10;
        ans=digit*(pow(2,i))+ans;
        n=n/10;
        i++;
    }
    cout<<ans;
}
#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int main()
{
    int t;
    cin>>t;
    while(t--)
    {
        int n,i,c0=0,c1=0,count=0;
        cin>>n;
        string a;
        cin>>a;
        if(n%2=='1')
        {
            if(a[n/2]==0)
            c0++;
            else
            c1++;
        }
        for(i=0;i<n/2;i++)
        {
            if(a[i]!=a[n-1-i])
            {
                count++;
            }
            if(a[i]=='0')
            c0++;
            if(a[n-1-i]=='0')
            c0++;
            if(a[i]=='1')
            c1++;
            if(a[n-i-1]=='1')
            c1++;
        }
        cout<<count<<endl;
    }
}
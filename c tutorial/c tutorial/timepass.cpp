#include<bits/stdc++.h>
using namespace std;
int main()
{
    int n;
    cout<<"enter the number : ";
    cin>>n;
    for(int i=1;i<=n;i++)
    {
        if(i%3==0)
        {
            continue;
        }
        cout<<i<<" ";
    }
    return 0;
}
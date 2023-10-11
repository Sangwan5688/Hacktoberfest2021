#include<bits/stdc++.h>
using namespace std;

int main()
{
    #ifndef ONLINE_JUDGE
    freopen("input.txt","r",stdin);
    freopen("output.txt","w",stdout);
    #endif
    int t;
    long long n,v,max,min;
    cin>>t;
    while(t--)
    {
        min=0;
        max=0;
        cin>>n>>v;
        max=n*(n-1)/2;
        if(v>=(n-1))
        {
            min=n-1;
        }
        else if(v==1)
        {
            min=max;
        }
        else
        {   
            min=(n-v)*(n-v+1)/2+(v-1);
        }
        cout<<max<<" "<<min<<endl;
    }

    return 0;
}
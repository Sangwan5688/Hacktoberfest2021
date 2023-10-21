#include<bits/stdc++.h>
using namespace std;
int pow()
{
    int a,b;
    cin>>a>>b;
    int ans=1;
    for(int i=1;i<=b;i++)
    {
        ans=ans*a;
    }
    return ans;
}
int main()
{
    int answer=pow();
    cout<<answer;
    return 0;
}
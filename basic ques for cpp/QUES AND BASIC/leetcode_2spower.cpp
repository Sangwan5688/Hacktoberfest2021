// power of two leet code 
#include<bits/stdc++.h>
using namespace std;
bool twospow(int n)
{
    int count=0;
    while(n)
    {
        int bit=n&1;
        count=count+bit;
        n=n>>1;
    }
    if(count==1)
    {
        return true;
    }else{
        return false;
    }
}
int main()
{
    int n;
    cin>>n;

    cout<<twospow(n);

    return 0;
}
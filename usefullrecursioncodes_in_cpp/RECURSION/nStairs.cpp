//count ways to reach the nth stairs

#include<bits/stdc++.h>
using namespace std;

int countDistinctWaysToClimbStair(int n)
{
    if(n<0)
    {
        return 0;
    }else if(n==0){
        return 1;

    }else{
        return countDistinctWaysToClimbStair(n-1)+countDistinctWaysToClimbStair(n-2);
    }
}

int main()
{
    int n;
    cin>>n;
    cout<<countDistinctWaysToClimbStair(n);
    
    return 0;
}
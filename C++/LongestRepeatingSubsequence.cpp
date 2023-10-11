#include<bits/stdc++.h>

using namespace std;

int main()
{
    string str;
    cin>>str;
    int n = str.length();
    vector<vector<int>> dp(n+1, vector<int>(n+1,0));

    for(int i=1; i<=n; i++)
    {
        for(int j=1; j<=n; j++)
        {
            if(i!=j and str[i-1]==str[j-1])
                dp[i][j] = 1+dp[i-1][j-1];
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    cout<<dp[n][n];
    return 0;
}
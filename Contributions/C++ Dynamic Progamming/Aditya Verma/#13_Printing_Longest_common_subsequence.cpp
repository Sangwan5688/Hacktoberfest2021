/*
    TODO: Longest Common Substring
    ? 
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    string s1,s2;
    cin>>s1>>s2;

    int n = s1.size(), m = s2.size();

    vector<vector<int>> dp(n+2, vector<int> (m+2,0));


    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(s1[i-1] == s2[j-1])
                dp[i][j] = 1 + dp[i-1][j-1];
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }


    int i=n, j=m;
    string ans = "";
    while(i >= 1 and j >= 1) {
        if(s1[i-1] == s2[j-1]) {
            ans.push_back(s1[i-1]);
            i--,j--;
        } else if(dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
    }
    reverse(ans.begin(), ans.end());
    cout<<ans<<endl;

}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}
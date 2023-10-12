/* 
    TODO: symmetric pairs in it
    ? https://www.geeksforgeeks.org/given-an-array-of-pairs-find-all-symmetric-pairs-in-it/
 */

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve(){
    int n;
    cin>>n;

    vector<pair<int,int>> pr;
    while(n--) {
        int a, b;
        cin>>a>>b;
        pr.push_back({a,b});
    }
    n = pr.size();

    unordered_map<int, int> mp;
    for(int i=0;i<n;i++) mp[pr[i].first] = pr[i].second;


    vector<pair<int,int>> ans;
    for(int i=0;i<n;i++) {
        if(mp.count(pr[i].first) == 0) continue;
        if(mp.count(pr[i].second) and mp[pr[i].second] == pr[i].first) {
            ans.push_back(pr[i]), mp.erase(pr[i].first);
        }
    }

    for(auto i : ans) cout<<i.first<<" "<<i.second<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;  
    while (t--) solve();
    return 0;
} 
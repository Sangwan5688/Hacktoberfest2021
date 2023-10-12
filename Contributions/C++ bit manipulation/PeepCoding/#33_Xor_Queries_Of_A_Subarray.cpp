/*
    TODO: Xor Queries Of A Subarray
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/bit-manipulation-xor-qs/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

vector<int> xorQueries(vector<int>& arr, vector<vector<int>>& queries) {
    vector<int> prefix(arr.size()),ans;
    prefix[0] = arr[0];
    for(int i = 1;i<arr.size();i++){ prefix[i] = prefix[i-1] ^ arr[i]; }
    for(auto i : prefix) cout<<i<<" ";
    cout<<endl;
    for(auto i : queries){
        int start = 0;
        if(i[0] - 1 >= 0){
            start = i[0] - 1;
            ans.push_back(prefix[i[1]] ^ prefix[start]);
        }else ans.push_back(prefix[i[1]]);
        // cout<<prefix[i[1]]<<endl;
    }
    return ans;
}

void solve(){
    int n;
    cin>>n;
    vector<int> arr(n);
    for(int i=0;i<arr.size();i++){cin>>arr[i];}

    int q;
    cin>>q;
    vector<vector<int>> queries;
    while(q--){
        int x,y;
        cin>>x>>y;
        vector<int> temp;
        temp.push_back(x);
        temp.push_back(y);
        queries.push_back(temp);
    }

    vector<int> ans = xorQueries(arr,queries);
    for(auto i : ans) cout<<i<<" ";
        cout<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    cin >> t;
    while (t--) solve();
    return 0;
}
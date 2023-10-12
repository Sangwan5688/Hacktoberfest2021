/*
    TODO: Nth Palindromic Binary
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/nth-palindromic-binary-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

// ! why it fail
void solve() {
    int n;
    cin>>n;

    int length = 0, offset = 0,steps = 0,i =1
        ,prev = 0,cnt = 0;
    while(true){
        steps += (1<<(i - 1));
        if(steps >= n) break;
        prev = steps;
        if(cnt&1) cnt = 0,i++;
        else cnt++;
    }

    length = steps - prev - 1;
    offset = n - prev - 1;

    string ans(length,'1');
    for (int i = 1; i < length-1; ++i) ans[i] = '0';

    string offBit = "";
    while(offset){
        offBit.push_back((offset&1) + '0');
        offset>>=1;
    }

    for(int i=((length+1)>>1) - 1;i>=0;i--){
        if(((length+1)>>1) - 1 - i >= offBit.size())
            break;
        else ans[i] = offBit[((length+1)>>1) - 1 - i];
    }

    int low = 0,high = length - 1;
    while(low < high){
        ans[high] = ans[low];
        low++,high--;
    }

    int no = 0;
    for(int i = ans.size()-1;i>=0;i--){
        no = no + (ans[i] - '0')*pow(2,ans.size()-i-1);
        // cout<<no<<endl;
    }
    cout<<no<<endl;

    // cout<<stoi(ans,0,2)<<endl;

    // cout<<ans<<endl;
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}
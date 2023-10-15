/* 
    TODO: Aggressive Cows
    ? https://practice.geeksforgeeks.org/problems/aggressive-cows/1
    ? https://www.spoj.com/problems/AGGRCOW/
 */

class Solution {
public:
    int isPossible(vector<int>& stalls, int n, int mid, int k) {
        int cnt = 1, start = stalls[0];
        
        for(int i=1;i<n;i++) {
            int dist = abs(stalls[i] - start);
            if(dist >= mid) {
                start = stalls[i];
                cnt++;
            }
        }
        
        return (cnt >= k);
    }
    int solve(int n, int k, vector<int> &stalls) {
        if(k > n) return -1;
        sort(stalls.begin(),stalls.end());
        
        int low = 1, high = 1e9, ans = 0;
        
        while(low <= high) {
            int mid = low + ((high - low)>>1);
            // cout<<low<<" "<<mid<<" "<<high<<endl;
            
            if(isPossible(stalls,n,mid,k)) {
                ans = max(ans,mid);
                low = mid+1;
            } else high = mid-1;
        }
        return ans;
    }
};
#include "bits/stdc++.h"
using namespace std;

/* Fibonacci Number : 
    1. memo , special case for 0 and 1 (tab) */
    // Brute 
        class Solution {
        public:
            int pre(int n){
                if(n == 0 or n == 1) return n;
                int left = pre(n-1);
                int right = pre(n-2);
                return left + right;
            }
            int fib(int n) {
                return pre(n);
            }
        };
    
    // memo
        class Solution {
        public:
            int pre(int n,vector<int> &dp){
                if(n == 0 or n == 1) return n;
                if(dp[n] != -1) return dp[n];
                int left = pre(n-1,dp);
                int right = pre(n-2,dp);
                return dp[n] = left + right;
            }
            int fib(int n) {
                vector<int> dp(n,-1);
                return pre(n,dp);
            }
        };

    // tab
        class Solution {
        public:
            int fib(int n) {
                vector<int> dp(n+1,0);
                if(n <= 1) return n; ⭐
                dp[0] = 0;
                dp[1] = 1;
                for(int i=2;i<=n;i++){
                    dp[i] = dp[i-1] + dp[i-2];
                }
                return dp[n];
            }
        };
    
    // optimize
        class Solution {
        public:
            int fib(int n) {
                if(n == 0) return 0;
                if(n == 1) return 1;
                int prev1 = 1,prev2 = 0;
                for(int i=2;i<n+1;i++){
                    int curr = prev1 + prev2;
                    prev2 = prev1;
                    prev1 = curr;
                }
                return prev1;
            }
        };

// Climbing Stairs
    // Brute
        class Solution {
        public:
            int pre(int n){
                if(n == 0 or n == 1) return n;
                int left = pre(n-1);
                int right = pre(n-2);
                return left + right;
            }
            int climbStairs(int n) {
                return pre(n+1);
            }
        };
    // memo
        class Solution {
        public:
            int pre(int n,vector<int> &dp){
                if(n == 0 or n == 1) return n;
                if(dp[n] != -1) return dp[n];
                int left = pre(n-1,dp);
                int right = pre(n-2,dp);
                return dp[n] = left + right;
            }
            int climbStairs(int n) {
                vector<int> dp(n+2,-1);
                return pre(n+1,dp);
            }
        };

    // tab
        class Solution {
        public:
            int climbStairs(int n) {
                vector<int> dp(n+2,-1);
                if(n == 0 or n == 1) return n;
                dp[0] = 0;
                dp[1] = 1;
                for(int i=2;i<=n+1;i++){
                    dp[i] = dp[i-1] + dp[i-2];
                }
                return dp[n+1];
            }
        };

    // optimize
        class Solution {
        public:
            int climbStairs(int n) {
                if(n == 0 or n == 1) return n;
                int prev2 = 0 , prev1 = 1;
                for(int i=2;i<=n+1;i++){
                    int curr = prev2 + prev1;
                    prev2 = prev1;
                    prev1 = curr;
                }
                return prev1;
            }
        };


/* Frog Jump 1 :
    1. second = 0 => second = -1e9 or INT_MIN */
    // brute
        #include <bits/stdc++.h> 
        int pre(int ind,vector<int> &heights){
            if(ind == 0) return 0;
            int first = 0;
            int second = INT_MAX; ⭐
            first = pre(ind-1,heights) + abs(heights[ind] - heights[ind-1]);
            if(ind >= 2) second = pre(ind-2,heights) + abs(heights[ind] - heights[ind-2]);
            return min(first,second);
        }
        int frogJump(int n, vector<int> &heights){
            return pre(n-1,heights);
        }
    
    // memo
        int pre(int ind,vector<int> &heights,vector<int> &dp){
            if(ind == 0) return 0;
            if(dp[ind] != -1) return dp[ind];
            int first = 0,second = INT_MAX;
            first = pre(ind-1,heights,dp) + abs(heights[ind] - heights[ind-1]);
            if(ind >= 2) second = pre(ind-2,heights,dp) + abs(heights[ind] - heights[ind-2]);
            return dp[ind] = min(first,second);
        }
        int frogJump(int n, vector<int> &heights){
            vector<int> dp(n+1,-1);
            return pre(n-1,heights,dp);
        }
    
    // tab
        int frogJump(int n, vector<int> &heights){
            vector<int> dp(n+1,0);
            dp[0] = 0;
            for(int i =1;i<=n;i++){
                int first = dp[i-1] + abs(heights[i] - heights[i-1]);
                int second = INT_MAX;
                if(i >= 2) second = dp[i-2] + abs(heights[i] - heights[i-2]);
                dp[i] = min(first,second);
            }
            return dp[n-1];
        }

    // optimize
        int frogJump(int n, vector<int> &heights){
            int prev1 = 0, prev2 = 0;
            for(int i =1;i<=n;i++){
                int first = prev1 + abs(heights[i] - heights[i-1]);
                int second = INT_MAX;
                if(i >= 2) second = prev2 + abs(heights[i] - heights[i-2]);
                int curr = min(first,second);
                prev2 = prev1;
                prev1 = curr;
            }
            return prev2;
        }

/* Frog Jump 2 : 
    1. incomplete - https://leetcode.com/problems/frog-jump/discuss/2287736/Easy-C%2B%2B-Solution-or-5-approaches-or-Recursion-%2B-DP */
    // Brute 
        class Solution {
        public:
            bool canCross(vector<int>& stones) {
                if(stones[1] - stones[0] > 1) return 0;
                return pre(0,1,stones);
            }
            bool pre(int i,int jumps,vector<int> &stones){
                if(i == stones.size() -1) return true;
                bool ans = false;
                for(int ind = i+1;ind<stones.size();ind++){
                    if(stones[ind] - stones[i] > jumps+1) break;
                    for(int jump= -1;jump <= 1;jump++){
                        if(stones[ind] - stones[i] == jumps + jump)
                            ans = pre(ind,jumps+jump,stones) or ans;
                    }
                }
                return ans;
            }
        };
    // memo
    // tab
    // optimize
/* B - Frog 2 :
    1. line 217 , i must start from 1 : condition ( ind >= i - 1) : dp of 1d array */
    // brute  
        int pre(int ind,int k,vector<int> &v){
            if(ind == 0) return 0;
            int cost = INT_MAX;
           ⭐ for(int i=1;i<=k;i++){
                int steps = INT_MAX;
               ⭐ if(ind >= i -1) steps = pre(ind - i,k,v) + abs(v[ind] - v[ind - i]);
                cost = min(steps,cost);
            }
            return cost;
        }
        
        void solve(){
            int n,k;
            cin>>n>>k;
            vector<int> v(n);
            input(v);
        
            cout<<pre(n-1,k,v)<<endl;
        }
        
    // memo
        int pre(int ind,int k,vector<int> &v,vector<int> &dp){
            if(ind == 0) return dp[ind] = 0;
            if(dp[ind] != -1) return dp[ind];
            int cost = INT_MAX;
            for(int i=1;i<=k;i++){
                int steps = INT_MAX;
                if(ind >= i -1) steps = pre(ind - i,k,v,dp) + abs(v[ind] - v[ind - i]);
                cost = min(steps,cost);
            }
            return dp[ind] = cost;
        }

        void solve(){
            int n,k;
            cin>>n>>k;
            vector<int> v(n);
            input(v);

            vector<int> dp(n+1,-1); ⭐

            cout<<pre(n-1,k,v,dp)<<endl;        
        }

    // tab
        void solve(){
            int n,k;
            cin>>n>>k;
            vector<int> v(n);
            input(v);
            vector<int> dp(n+1,-1);
            dp[0] = 0;
            for(int ind=1;ind<=n;ind++){
                int cost = 1e9;
                for(int i=1;i<=k;i++){
                    int steps = 1e9;
                    if(ind >= i - 1)
                        steps = dp[ind-i] + abs(v[ind] - v[ind-i]);
                    cost = min(cost,steps);
                }
                dp[ind] = cost;
            }
            cout<<dp[n-1]<<endl;        
        }

/* Maximum sum of non-adjacent elements : 
    1. in base of take = INT_MIN => arr[ind] 
    2. (memo) don't return dp[n-1] => return pre(n-1) */
    // brute
        class Solution{
        public:	
            int pre(int ind,int *arr){
                if(ind == 0) return arr[0];
                int dtake = 0 + pre(ind-1,arr);
                int take = arr[ind]; ⭐
                if(ind > 1) take += pre(ind-2,arr);
                return max(take,dtake);
            }
            int findMaxSum(int *arr, int n) {
                return pre(n-1,arr);
            }
        };

    // memo
        class Solution{
        public:	
            int pre(int ind,int *arr,vector<int> &dp){
                if(ind == 0) return arr[0];
                if(dp[ind] != -1) return dp[ind];
                int dtake = 0 + pre(ind-1,arr,dp);
                int take = arr[ind];
                if(ind > 1) take += pre(ind-2,arr,dp);
                return dp[ind] = max(take,dtake);
            }
            int findMaxSum(int *arr, int n) {
                vector<int> dp(n+1,-1);
                // pre(n-1,arr,dp); ⭐
                // return dp[n-1];
                return pre(n-1,arr,dp);
            }
        };

    // tab
        class Solution{
        public:	
            int findMaxSum(int *arr, int n) {
                vector<int> dp(n+1,0);
                dp[0] = arr[0];
                
                for(int i=1;i<=n;i++){
                    int dtake = 0 + dp[i-1];
                    int take = arr[i];
                    if(i > 1) take += dp[i-2];
                    dp[i] = max(take,dtake);
                }
                
                return dp[n-1];
            }
        };

    // optimize
        class Solution{
        public:	
            int findMaxSum(int *arr, int n) {
                int prev1 = arr[0],prev2 = 0;
                
                for(int i=1;i<=n;i++){
                    int dtake = 0 + prev1;
                    int take = arr[i];
                    if(i > 1) take += prev2;
                    int curr = max(take,dtake);
                    prev2 = prev1;
                    prev1 = curr;
                }
                
                return prev2;
            }
        };

/* House Robber :
    1. handle single element, forget condition of 2 arr */
    // optimal
        class Solution {
        public:
            int nonAdjSum(vector<int> nums){
                int n = nums.size();
                vector<int> dp(n+1,0);
                dp[0] = nums[0];
                for(int ind =1;ind<n;ind++){
                    int dtake = dp[ind-1];
                    int take = nums[ind];
                    if(ind > 1) take += dp[ind-2];
                    dp[ind] = max(take,dtake);
                }
                return dp[n-1];
            }
            int rob(vector<int>& nums) {
                if(nums.size() == 1) return nums[0]; ⭐
                vector<int> temp1(nums),temp2(nums);
                temp1.erase(temp1.begin()); ⭐
                temp2.pop_back();
                return max(nonAdjSum(temp1),nonAdjSum(temp2));
            }
        };

/* Ninja’s Training : 
    1. (tab) prev 0 -> 2 => 0 -> 3 : return dp[n-1][1] => dp[n-1][3] */
    // brute
        #include "bits/stdc++.h"
        int pre(int ind,int prev,vector<vector<int>> &points){
            if(ind == 0){
                int maxi = INT_MIN;
                for(int i=0;i<3;i++){
                    int steps = 0;
                    if(i!= prev) 
                        steps = points[0][i];
                    maxi = max(maxi,steps);
                }
                return maxi;
            }
            int moves = INT_MIN;
            for(int i=0;i<3;i++){
                int steps = 0;
                if(i!= prev)
                    steps = points[ind][i] + pre(ind-1,i,points);
                moves = max(moves,steps);
            }
            return moves;
        }

        int ninjaTraining(int n, vector<vector<int>> &points){    
            return pre(n-1,3,points);
        }

    // memo
        int pre(int ind,int prev,vector<vector<int>> &points,vector<vector<int>> &dp){
            if(ind == 0){
                int maxi = INT_MIN;
                for(int i=0;i<3;i++){
                    int steps = 0;
                    if(i!= prev) 
                        steps = points[0][i];
                    maxi = max(maxi,steps);
                }
                return maxi;
            }
            if(dp[ind][prev] != -1) return dp[ind][prev];
            int moves = INT_MIN;
            for(int i=0;i<3;i++){
                int steps = 0;
                if(i!= prev)
                    steps = points[ind][i] + pre(ind-1,i,points,dp);
                moves = max(moves,steps);
            }
            return dp[ind][prev] = moves;
        }

        int ninjaTraining(int n, vector<vector<int>> &points){  
            vector<vector<int>> dp(n,vector<int> (4,-1));  
            return pre(n-1,3,points,dp);
        }

    // tab
        int ninjaTraining(int n, vector<vector<int>> &points){  
            vector<vector<int>> dp(n+1,vector<int> (4,0));

            dp[0][0] = max({points[0][1],points[0][2]});
            dp[0][1] = max({points[0][0],points[0][2]});
            dp[0][2] = max({points[0][0],points[0][1]});
            dp[0][3] = max({points[0][0],points[0][1],points[0][2]});

            for(int ind =1;ind<n;ind++){
                for(int prev = 0;prev<=3;prev++){ ⭐
                    int moves = INT_MIN;
                    for(int i=0;i<3;i++){
                        int steps = 0;
                        if(i!= prev) steps = points[ind][i] + dp[ind-1][i];
                        moves = max(moves,steps);
                    }
                    dp[ind][prev] = moves;
                }
            }

            // for(auto j : dp){ for(auto i : j){ cout<<i<<" "; } cout<<endl; }
            return dp[n-1][3]; ⭐
            // return pre(n-1,3,points,dp);
        }

    // optimize
        #include "bits/stdc++.h"    
        int ninjaTraining(int n, vector<vector<int>> &points){  
            // vector<vector<int>> dp(n+1,vector<int> (4,0));
            vector<int> dp(4,0),curr(4,0);

            dp[0] = max({points[0][1],points[0][2]});
            dp[1] = max({points[0][0],points[0][2]});
            dp[2] = max({points[0][0],points[0][1]});
            dp[3] = max({points[0][0],points[0][1],points[0][2]});

            for(int ind =1;ind<n;ind++){
                for(int prev = 0;prev<=3;prev++){
                    int moves = INT_MIN;
                    for(int i=0;i<3;i++){
                        int steps = 0;
                        if(i!= prev) steps = points[ind][i] + dp[i];
                        moves = max(moves,steps);
                    }
                    curr[prev] = moves;
                }
                dp = curr;
            }

            // for(auto j : dp){ for(auto i : j){ cout<<i<<" "; } cout<<endl; }
            return dp[3];
        }

/* Unique Paths: 
    1. (tab) condition (i : 1 -> m (j : 1 -> n)) => (i : 0 -> m (j : 0 -> n)) 
    2. optimize base case dp[i][j] = curr[j] */
    // brute
        class Solution {
        public:
            int pre(int m,int n){
                if(m == 0 and n == 0) return 1;
                if(m < 0 or n < 0) return 0;
                int up = pre(m-1,n);
                int left = pre(m,n-1);
                return up + left;
            }
            int uniquePaths(int m, int n) {
                return pre(m-1,n-1);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int m,int n,vector<vector<int>> &dp){
                if(m == 0 and n == 0) return 1;
                if(m < 0 or n < 0) return 0;
                if(dp[n][m] != -1) return dp[n][m];
                int up = pre(m-1,n,dp);
                int left = pre(m,n-1,dp);
                return dp[n][m] = up + left;
            }
            int uniquePaths(int m, int n) {
                vector<vector<int>> dp(n,vector<int> (m,-1));
                return pre(m-1,n-1,dp);
            }
        };

    // tab
        class Solution {
        public:
            int uniquePaths(int m, int n) {
                vector<vector<int>> dp(m,vector<int> (n,0));
                for(int i=0;i<m;i++){⭐
                    for(int j=0;j<n;j++){⭐
                        if(i == 0 and j == 0){
                            dp[i][j] = 1;
                            continue;
                        }
                        int up = 0,left = 0;
                        if(i > 0) up = dp[i-1][j];
                        if(j > 0) left = dp[i][j-1];
                        dp[i][j] = up + left;
                    }
                }
                return dp[m-1][n-1];
            }
        };
    // optimize
        class Solution {
        public:
            int uniquePaths(int m, int n) {
                vector<int> dp(n,0),curr(n,0);
                for(int i=0;i<m;i++){
                    for(int j=0;j<n;j++){
                        if(i == 0 and j == 0){
                            curr[j] = 1;🔥
                            continue;
                        }
                        int up = 0,left = 0;
                        if(i > 0) up = dp[j];
                        if(j > 0) left = curr[j-1];
                        curr[j] = up + left;
                    }
                    dp = curr;
                }
                return dp[n-1];
            }
        };

/* Unique Paths II : 
    1. (brute) if(i<=0 or j<=0) => if(i<0 or j<0) 
    2. [[1]] case (memo) write base condition 
    3. (tab) if(i > 0) if(j > 0) left ,right = 0 */
    // brute
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& arr){
                if(i == 0 and j == 0) return 1;
                if(i < 0 or j < 0) return 0; 🔥
                if(arr[i][j] == 1) return 0;

                int left = pre(i-1,j,arr);
                int right = pre(i,j-1,arr);
                return left + right;        
            }
            int uniquePathsWithObstacles(vector<vector<int>>& arr){
                int n = arr.size(),m = arr[0].size();
                return pre(n-1,m-1,arr);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& arr,vector<vector<int>> &dp){
                if(i < 0 or j < 0) return 0;
                if(arr[i][j] == 1) return 0;
                if(i == 0 and j == 0) return 1; 🔥

                if(dp[i][j] != -1) return dp[i][j];
                
                int left = pre(i-1,j,arr,dp);
                int right = pre(i,j-1,arr,dp);
                return dp[i][j] = left + right;        
            }
            int uniquePathsWithObstacles(vector<vector<int>>& arr){
                int n = arr.size(),m = arr[0].size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n-1,m-1,arr,dp);
            }
        };
    
    // tab
        class Solution {
        public:
            int uniquePathsWithObstacles(vector<vector<int>>& arr){
                int n = arr.size(),m = arr[0].size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                
                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(arr[i][j] == 1) dp[i][j] = 0;
                        else if(i == 0 and j == 0) dp[i][j] = 1;
                        else{
                            int left = 0,right = 0;
                            if(i > 0) left = dp[i-1][j]; 🔥
                            if(j > 0) right = dp[i][j-1];
                            dp[i][j] = left + right;
                        }
                    }
                }
                
                return dp[n-1][m-1];
            }
        };

    // optimize 2d
        class Solution {
        public:
            int uniquePathsWithObstacles(vector<vector<int>>& arr){
                int n = arr.size(),m = arr[0].size();
                vector<int> dp(m+1,0),curr(m+1,0);
                
                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(arr[i][j] == 1) curr[j] = 0;
                        else if(i == 0 and j == 0) curr[j] = 1;
                        else{
                            int left = 0,right = 0;
                            if(i > 0) left = dp[j];
                            if(j > 0) right = curr[j-1];
                            curr[j] = left + right;
                        }
                    }
                    dp = curr;
                }
                
                return dp[m-1];
            }
        };
    
    // optimize 
        class Solution {
        public:
            int uniquePathsWithObstacles(vector<vector<int>>& arr){
                int n = arr.size(),m = arr[0].size();
                vector<int> dp(m+1,0);
                
                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(arr[i][j] == 1) dp[j] = 0;
                        else if(i == 0 and j == 0) dp[j] = 1;
                        else{
                            int left = 0,right = 0;
                            if(i > 0) left = dp[j];
                            if(j > 0) right = dp[j-1];
                            dp[j] = left + right;
                        }
                    }
                }
                
                return dp[m-1];
            }
        };

/* Minimum Path Sum
    1. (tab) writting the else giving 1e9 */
    // brute
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& grid){
                if(i == 0 and j == 0) return grid[i][j];
                if(i < 0 or j < 0) return 1e9;
                int left = pre(i-1,j,grid) + grid[i][j];
                int right = pre(i,j-1,grid) + grid[i][j];
                return min(left, right);
            }
            int minPathSum(vector<vector<int>>& grid) {
                int n = grid.size(),m = grid[0].size();
                return pre(n-1,m-1,grid);
            }
        };
    
    // memo
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& grid,vector<vector<int>> &dp){
                if(i == 0 and j == 0) return grid[i][j];
                if(i < 0 or j < 0) return 1e9;
                if(dp[i][j] != -1) return dp[i][j];
                int left = pre(i-1,j,grid,dp) + grid[i][j];
                int right = pre(i,j-1,grid,dp) + grid[i][j];
                return dp[i][j] = min(left, right);
            }
            int minPathSum(vector<vector<int>>& grid) {
                int n = grid.size(),m = grid[0].size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n-1,m-1,grid,dp);
            }
        };
    
    // tab
        class Solution {
        public:
            int minPathSum(vector<vector<int>>& grid) {
                int n = grid.size(),m = grid[0].size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));

                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(i==0 and j==0) dp[i][j] = grid[i][j];
                        else{
                            int left = grid[i][j], right = grid[i][j];
                            if(i > 0) left += dp[i-1][j];
                            else left += 1e9;
                            if(j > 0) right += dp[i][j-1];
                            else right += 1e9;
                            dp[i][j] = min(left,right);
                        }
                    }
                }
                for(auto i : dp){ for(auto j : i){ cout<<j<<" "; } cout<<endl; }
                return dp[n-1][m-1];
            }
        };
    
    // optimize 2d
        class Solution {
        public:
            int minPathSum(vector<vector<int>>& grid) {
                int n = grid.size(),m = grid[0].size();
                vector<int> dp(m+1,0),curr(m+1,0);

                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(i==0 and j==0) curr[j] = grid[i][j];
                        else{
                            int left = grid[i][j], right = grid[i][j];
                            if(i > 0) left += dp[j];
                            else left += 1e9; 🔥
                            if(j > 0) right += curr[j-1];
                            else right += 1e9;
                            curr[j] = min(left,right);
                        }
                    }
                    dp = curr;
                }
                return dp[m-1];
            }
        };

    // optimize 1d
        class Solution {
        public:
            int minPathSum(vector<vector<int>>& grid) {
                int n = grid.size(),m = grid[0].size();
                vector<int> dp(m+1,0);

                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(i==0 and j==0) dp[j] = grid[i][j];
                        else{
                            int left = grid[i][j], right = grid[i][j];
                            if(i > 0) left += dp[j];
                            else left += 1e9;
                            if(j > 0) right += dp[j-1];
                            else right += 1e9;
                            dp[j] = min(left,right);
                        }
                    }
                }
                return dp[m-1];
            }
        };

/* Triangle 
    1. wrong base case in brute
        if(i == arr.size() - 1){
            if(j+1 < arr.size()) return min(arr[i][j], arr[i][j+1]);  
            else return min(arr[i][j]);
        } => 
        if(i == arr.size() - 1) return arr[i][j];
    2.  m = triangle[0].size(); => n = m = triangle.size();
    3. (tab) for loop take more time */
    // brute
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& arr){
                if(i == arr.size() - 1) return arr[i][j]; ⭐
                int fmove = pre(i+1,j,arr) + arr[i][j];
                int smove = pre(i+1,j+1,arr) + arr[i][j];
                return min(fmove,smove);
            }
            int minimumTotal(vector<vector<int>>& triangle) {
                return pre(0,0,triangle);   
            }
        };

    // memo
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& arr,vector<vector<int>> & dp){
                if(i == arr.size() - 1) return arr[i][j];
                if(dp[i][j] != -1) return dp[i][j];
                int fmove = pre(i+1,j,arr,dp) + arr[i][j];
                int smove = pre(i+1,j+1,arr,dp) + arr[i][j];
                return dp[i][j] = min(fmove,smove);
            }
            int minimumTotal(vector<vector<int>>& triangle) {
                // int n = triangle.size(), m = triangle[0].size();
                int n,m;
                n = m = triangle.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(0,0,triangle,dp);   
            }
        };
    
    // tab
        class Solution {
        public:
            int minimumTotal(vector<vector<int>>& arr) {
                int n = arr.size();
                vector<vector<int>> dp(n,vector<int> (n,0));
                for(int j = 0;j<n;j++) dp[n-1][j] = arr[n-1][j];
                
                for(int i=n-2;i>=0;i--){ ⭐
                    for(int j=0;j<i+1;j++){ ⭐
                        int fmove = dp[i+1][j] + arr[i][j];
                        int smove = dp[i+1][j+1] + arr[i][j];
                        dp[i][j] = min(fmove,smove);
                    }
                }
                
                return dp[0][0];   
            }
        };
    
    // optimze 2 array
        class Solution {
        public:
            int minimumTotal(vector<vector<int>>& arr) {
                int n = arr.size();
                vector<int> dp(n,0),curr(n,0);
                for(int j = 0;j<n;j++) dp[j] = arr[n-1][j];
                
                for(int i=n-2;i>=0;i--){
                    for(int j=0;j<i+1;j++){
                        int fmove = dp[j] + arr[i][j];
                        int smove = dp[j+1] + arr[i][j];
                        curr[j] = min(fmove,smove);
                    }
                    dp = curr;
                }
                
                return dp[0];   
            }
        };

    // optimize 1 array
        class Solution {
        public:
            int minimumTotal(vector<vector<int>>& arr) {
                int n = arr.size();
                vector<int> dp(n,0);
                for(int j = 0;j<n;j++) dp[j] = arr[n-1][j];
                
                for(int i=n-2;i>=0;i--){
                    for(int j=0;j<i+1;j++){
                        int fmove = dp[j] + arr[i][j];
                        int smove = dp[j+1] + arr[i][j];
                        dp[j] = min(fmove,smove);
                    }
                }
                
                return dp[0];   
            }
        };

/* Minimum Falling Path Sum 🔺
    1. approach don't know 
    2. there would be few change for max path sum
    3. not any clew about tab for loop
    4. forget else case in tab
    5. forget about the maximum and minimum of last row of matrix
    6. code of optimzation was showing wrong result
    */
    // brute 
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& matrix){
                if(j < 0 or  j >= matrix[0].size()) return 1e9;
                if(i == 0) return matrix[0][j];
                
                int up = matrix[i][j] + pre(i-1,j,matrix);
                int left = matrix[i][j] + pre(i-1,j-1,matrix);
                int right = matrix[i][j] + pre(i-1,j+1,matrix);
                    
                return min({up,right,left});
            }
            int minFallingPathSum(vector<vector<int>>& matrix) {
                int n = matrix.size();
                int m = matrix[0].size();
                
                int maxi = INT_MAX;
                for(int j=0;j<m;j++){
                    int steps = pre(n-1,j,matrix);
                    maxi = min(maxi,steps);
                }
                
                return maxi;
            }
        }; 
        
    // memo
        class Solution {
        public:
            int pre(int i,int j,vector<vector<int>>& matrix,vector<vector<int>> &dp){
                if(j < 0 or  j >= matrix[0].size()) return 1e9;
                if(i == 0) return matrix[0][j];
                if(dp[i][j]!=-1) return dp[i][j];
                
                int up = matrix[i][j] + pre(i-1,j,matrix,dp);
                int left = matrix[i][j] + pre(i-1,j-1,matrix,dp);
                int right = matrix[i][j] + pre(i-1,j+1,matrix,dp);
                    
                return dp[i][j] = min({up,right,left});
            }
            int minFallingPathSum(vector<vector<int>>& matrix) {
                int n = matrix.size();
                int m = matrix[0].size();
                
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                
                int maxi = INT_MAX;
                for(int j=0;j<m;j++){ ⭐
                    int steps = pre(n-1,j,matrix,dp);
                    maxi = min(maxi,steps);
                }
                
                return maxi;
            }
        }; 
    // tab
        class Solution {
        public:
            int minFallingPathSum(vector<vector<int>>& matrix) {
                int n = matrix.size();
                int m = matrix[0].size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(i == 0) dp[i][j] = matrix[i][j];
                        else{
                            int left,right,up;
                            left = right = up = matrix[i][j];
                            if(j - 1 >= 0) left += dp[i-1][j-1]; else left += 1e9; ⭐
                            if(j + 1 < m) right += dp[i-1][j+1]; else right += 1e9; ⭐
                            up += dp[i-1][j];
                            dp[i][j] = min({left,right,up});
                        }
                    }
                }
                int maxi = 1e9;
                for(int j=0;j<m;j++){ ⭐
                    maxi = min(maxi, dp[n-1][j]);
                }
                return maxi;
            }
        }; 

    // optimize 🔺
        class Solution {
        public:
            int minFallingPathSum(vector<vector<int>>& arr) {
                int n = arr.size();
                int m = arr[0].size();
                
                // vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                vector<int> dp(m,0),curr(m,0);
            
                for(int i=0;i<n;i++){
                    for(int j=0;j<m;j++){
                        if(i == 0) dp[j] = arr[i][j];
                        else{
                            int left,right,up;
                            left = right = up = arr[i][j];
                            if(j - 1 >= 0) left += dp[j-1]; else left += 1e9;
                            if(j + 1 < m) right += dp[j+1]; else right += 1e9;
                            up += dp[j];
                            curr[j] = min({left,right,up});
                        }
                    }
                    dp = curr;
                }
                
                int mini = 1e9;
                for(int j=0;j<m;j++) mini = min(mini, dp[j]);
                return mini;
            }
        }; 
/* Chocolate Pickup
    1. not clear about code with approach */

    // brute
        #include <bits/stdc++.h> 
        int pre(int i,int j1,int j2,int r,int c,vector<vector<int>> &grid){
            if(j1< 0 or j1>= c or j2 < 0 or j2 >= c) return -1e9;
            if(i == r - 1){
                if(j1 == j2) return grid[i][j1];
                else return grid[i][j1] + grid[i][j2];
            }
            int maxi = -1e9;
            for(int dj1=-1;dj1<=1;dj1++){
                for(int dj2=-1;dj2<=1;dj2++){
                    int k =0;
                    if(j1 == j2) k = grid[i][j1] + pre(i+1,j1+dj1,j2+dj2,r,c,grid);
                    else k = grid[i][j1] + grid[i][j2] + pre(i+1,j1+dj1,j2+dj2,r,c,grid);
                    maxi = max(maxi,k);
                }
            }
            return maxi;
        }
        int maximumChocolates(int r, int c, vector<vector<int>> &grid) {
            return pre(0,0,c-1,r,c,grid);
        }
    
    // memo
        #include <bits/stdc++.h> 
        int pre(int i,int j1,int j2,int r,int c,vector<vector<int>> &grid,vector<vector<vector<int>>> &dp){
            if(j1< 0 or j1>= c or j2 < 0 or j2 >= c) return -1e9;
            if(i == r - 1){
                if(j1 == j2) return grid[i][j1];
                else return grid[i][j1] + grid[i][j2];
            }
            if(dp[i][j1][j2] != -1) return dp[i][j1][j2];
            
            int maxi = -1e9;
            
            for(int dj1=-1;dj1<=1;dj1++){
                for(int dj2=-1;dj2<=1;dj2++){
                    int k =0;
                    if(j1 == j2) k = grid[i][j1] + pre(i+1,j1+dj1,j2+dj2,r,c,grid,dp);
                    else k = grid[i][j1] + grid[i][j2] + pre(i+1,j1+dj1,j2+dj2,r,c,grid,dp);
                    maxi = max(maxi,k);
                }
            }
            return dp[i][j1][j2] = maxi;
        }

        int maximumChocolates(int r, int c, vector<vector<int>> &grid) {
            vector<vector<vector<int>>> dp(r,vector<vector<int>> (c,vector<int> (c,-1)));
            return pre(0,0,c-1,r,c,grid,dp);
        }

    // tab
        #include <bits/stdc++.h>
        int maximumChocolates(int r, int c, vector<vector<int>> &grid) {
            vector<vector<vector<int>>> dp(r,vector<vector<int>> (c,vector<int> (c,0)));
            for(int j1 =0;j1<c;j1++){
                for(int j2 =0;j2<c;j2++){
                    if(j1 == j2) dp[r-1][j1][j2] = grid[r-1][j1];
                    else dp[r-1][j1][j2] = grid[r-1][j1] + grid[r-1][j2];
                }
            }
            for(int i=r-2;i>=0;i--){
                for(int j1=0;j1<=c-1;j1++){  ⭐
                    for(int j2=0;j2<=c-1;j2++){  ⭐
                        int maxi = -1e9;
                        for(int dj1=-1;dj1<=1;dj1++){
                            for(int dj2=-1;dj2<=1;dj2++){
                                int ans = 0;
                                if(j1 == j2) ans = grid[i][j1];
                                else ans = grid[i][j1] + grid[i][j2];
                                if( (j1 + dj1 < 0 or j1 + dj1 >= c) or (j2 + dj2 < 0 or j2 + dj2 >= c)) ⭐
                                    ans += -1e9;
                                else ans += dp[i+1][j1+dj1][j2+dj2];
                                maxi = max(maxi,ans);
                            }
                        }
                        dp[i][j1][j2] = maxi;
                    }
                }
            }
            
            return dp[0][0][c-1]; ⭐
        //     return pre(0,0,c-1,r,c,grid,dp);
        }
    
    // optimize
        #include <bits/stdc++.h>
        int maximumChocolates(int r, int c, vector<vector<int>> &grid) {
            // vector<vector<vector<int>>> dp(r,vector<vector<int>> (c,vector<int> (c,0)));
            vector<vector<int>> dp(c,vector<int> (c,0)),curr(c,vector<int> (c,0));

            for(int j1 =0;j1<c;j1++){
                for(int j2 =0;j2<c;j2++){
                    if(j1 == j2) dp[j1][j2] = grid[r-1][j1];
                    else dp[j1][j2] = grid[r-1][j1] + grid[r-1][j2];
                }
            }

            for(int i=r-2;i>=0;i--){
                for(int j1=0;j1<=c-1;j1++){  
                    for(int j2=0;j2<=c-1;j2++){  
                        int maxi = -1e9;
                        for(int dj1=-1;dj1<=1;dj1++){
                            for(int dj2=-1;dj2<=1;dj2++){
                                int ans = 0;
                                if(j1 == j2) ans = grid[i][j1];
                                else ans = grid[i][j1] + grid[i][j2];
                                if( (j1 + dj1 < 0 or j1 + dj1 >= c) or (j2 + dj2 < 0 or j2 + dj2 >= c))
                                    ans += -1e9;
                                else ans += dp[j1+dj1][j2+dj2];
                                maxi = max(maxi,ans);
                            }
                        }
                        curr[j1][j2] = maxi;
                    }
                }
                dp = curr;
            }
            
            return dp[0][c-1];
        }



/* Subset Sum Equal To K 
    1. I had swaped value of recursion base condition
    2. tab for loop condition conversion with k
    3. another (tab) where the target must be less and equal to not less than */
    // brute
        #include <bits/stdc++.h> 
        int pre(int ind,int k,vector<int> &arr){
            if(k == 0) return true; ⭐
            if(ind == 0) return (arr[0] == k); ⭐
            int dtake= false,take = false;
            dtake = pre(ind-1,k,arr);
            if(arr[ind] <= k) 
                take = pre(ind-1,k-arr[ind],arr);
            return take or dtake;
        }
        bool subsetSumToK(int n, int k, vector<int> &arr) {
            return pre(n-1,k,arr);
        }
    
    // memo
        #include <bits/stdc++.h> 
        int pre(int ind,int k,vector<int> &arr,vector<vector<int>> &dp){
            if(k == 0) return true;
            if(ind == 0) return (arr[0] == k);
            if(dp[ind][k] != -1) return dp[ind][k];
            int dtake= false,take = false;
            dtake = pre(ind-1,k,arr,dp);
            if(arr[ind] <= k) 
                take = pre(ind-1,k-arr[ind],arr,dp);
            return take or dtake;
        }
        bool subsetSumToK(int n, int k, vector<int> &arr) {
            vector<vector<int>> dp(n,vector<int> (k+1,-1));
            return pre(n-1,k,arr,dp);
        }

    // tab
        #include "bits/stdc++.h"
        using namespace std;
        bool subsetSumToK(int n, int k, vector<int> &arr) {
            vector<vector<int>> dp(n,vector<int> (k+1,0));

            for(int i=0;i<n;i++) dp[i][0] = true;
            for(int i=0;i<k;i++) dp[0][k] = (arr[0] == k); ⭐
            // if(arr[0]<=k) dp[0][arr[0]] = true; use this

            for(int i=1;i<n;i++){
                for(int j=0;j<=k;j++){ ⭐
                    int dtake = false,take = false;
                    dtake = dp[i-1][j];
                    if(arr[i] <= j) take = dp[i-1][j - arr[i]];
                    dp[i][j] = dtake or take;
                }
            }
            return dp[n-1][k];
        }

    // optimize
        #include "bits/stdc++.h"
        using namespace std;
        bool subsetSumToK(int n, int k, vector<int> &arr) {
            vector<int> dp(k+1,0),curr(k+1,0);
            dp[0] = true;
            dp[k] == (arr[0] == k);
            // if(arr[0]<=k) dp[0][arr[0]] = true; use this

            for(int i=1;i<n;i++){
                for(int j=0;j<=k;j++){
                    int dtake = false,take = false;
                    dtake = dp[j];
                    if(arr[i] <= j) take = dp[j - arr[i]];
                    curr[j] = dtake or take;
                }
                dp = curr;
            }
            
            return dp[k];
        }

/* Partition Equal Subset Sum
    1. I had swaped value of recursion base condition
    2. tab for loop condition conversion with k
    3. another (tab) where the target must be less and equal to not less than */
    // brute
        class Solution {
        public:
            int pre(int ind,int k,vector<int> &nums){
                if(k == 0) return true;⭐
                if(ind == 0) return (k == nums[0]);⭐
                int dtake =0,take =0;
                dtake = pre(ind-1,k,nums);
                if(nums[ind] <= k) take = pre(ind-1,k-nums[ind],nums);
                return dtake or take;
            }
            int canpart(int target,vector<int> &nums){
                return pre(nums.size() -1,target,nums);
            }
            bool canPartition(vector<int>& nums) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                if(sumi%2==1) return false;
                else{
                    int target = sumi/2;
                    if(canpart(target,nums)) return true;
                    else return false;
                }
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int k,vector<int> &nums,vector<vector<int>> &dp){
                if(k == 0) return true;
                if(ind == 0) return (k == nums[0]);
                if(dp[ind][k] != -1) return dp[ind][k];
                
                int dtake =0,take =0;
                dtake = pre(ind-1,k,nums,dp);
                if(nums[ind] <= k) take = pre(ind-1,k-nums[ind],nums,dp);
                
                return dp[ind][k] = dtake or take;
            }
            int canpart(int target,vector<int> &nums){
                int n = nums.size();
                vector<vector<int>> dp(n,vector<int> (target+1,-1));
                return pre(n -1,target,nums,dp);
            }
            bool canPartition(vector<int>& nums) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                if(sumi%2==1) return false;
                else{
                    int target = sumi/2;
                    if(canpart(target,nums)) return true;
                    else return false;
                }
            }
        };

    // tab
        class Solution {
        public:
            int canpart(int target,vector<int> &nums){
                int n = nums.size();
                vector<vector<int>> dp(n,vector<int> (target+1,0));
                
                for(int i=0;i<n;i++) dp[i][0] = true;
                for(int i=0;i<target;i++) dp[0][target] = (target == nums[0]); ⭐
                // if(arr[0]<=k) dp[0][arr[0]] = true; use this
                
                for(int ind=1;ind<n;ind++){
                    for(int k=0;k<=target;k++){ ⭐
                        int dtake=0,take=0;
                        dtake = dp[ind-1][k];
                        if(nums[ind] <= k) take = dp[ind-1][k-nums[ind]];
                        dp[ind][k] = take or dtake;
                    }
                }
                
                return dp[n-1][target];
            }
            bool canPartition(vector<int>& nums) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                if(sumi%2==1) return false;
                else{
                    int target = sumi/2;
                    if(canpart(target,nums)) return true;
                    else return false;
                }
            }
        };

    // optimize
        class Solution {
        public:
            int canpart(int target,vector<int> &nums){
                int n = nums.size();
                vector<int> dp(target+1,0),curr(target+1,0);
                
                dp[0] = true;
                dp[target] = (target == nums[0]);
                // if(arr[0]<=k) dp[0][arr[0]] = true; use this
                
                for(int ind=1;ind<n;ind++){
                    for(int k=0;k<=target;k++){
                        int dtake=0,take=0;
                        dtake = dp[k];
                        if(nums[ind] <= k) take = dp[k-nums[ind]];
                        curr[k] = take or dtake;
                    }
                    dp = curr;
                }
                
                return dp[target];
            }
            bool canPartition(vector<int>& nums) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                if(sumi%2==1) return false;
                else{
                    int target = sumi/2;
                    if(canpart(target,nums)) return true;
                    else return false;
                }
            }
        };

/* Partition Array Into Two Arrays to Minimize Sum Difference 👆
    1. don't know the approach
    2. code is not working for negative edge */
/* Number Of Subsets or Count Subsets with Sum K
    1. base condition were wrong given by striver
        if(ind == 0){
            if(tar == 0 and nums[0] == 0) return 2;
            if(tar == 0 or tar == nums[0]) return 1;
            return 0;
        }
    2. if(tar == 0) condition will not come
    3. (tab) code conversion
        if(nums[0] == 0) dp[0][0] =2; 
        else dp[0][0] = 1;     
        if(nums[0]!=0 && nums[0]<=tar) dp[0][nums[0]] = 1;   */
    // brute
        #include <bits/stdc++.h> 
        int pre(int ind,int tar,vector<int> &nums){
            if(ind == 0){ ⭐
                if(tar == 0 and nums[0] == 0) return 2;
                if(tar == 0 or tar == nums[0]) return 1;
                return 0;
            }  
            // if(tar == 0) return 1; ❌

            int dtake = 0,take = 0;
            dtake = pre(ind-1,tar,nums);
            if(nums[ind] <= tar) take = pre(ind-1,tar-nums[ind],nums); ⭐
            return take+dtake;
        }
        int findWays(vector<int> &num, int tar){
            int n = num.size();
            return pre(n-1,tar,num);
        }

    // memo
        #include <bits/stdc++.h> 
        int pre(int ind,int tar,vector<int> &nums,vector<vector<int>> &dp){
            if(ind == 0){ ⭐
                if(tar == 0 and nums[0] = 0) return 2;
                if(tar == 0 or tar == nums[0]) return 1;
                return 0;
            } 
            // if(tar == 0) return 1; ❌
            if(dp[ind][tar] != -1) return dp[ind][tar];
            
            int dtake = 0,take = 0;
            dtake = pre(ind-1,tar,nums,dp);
            if(nums[ind] <= tar) take = pre(ind-1,tar-nums[ind],nums,dp);
            return dp[ind][tar] = take+dtake;
        }
        int findWays(vector<int> &num, int tar){
            int n = num.size();
            vector<vector<int>> dp(n+1,vector<int> (tar+1,-1));
            return pre(n-1,tar,num,dp);
        }
    // tab 
        #include <bits/stdc++.h> 
        int findWays(vector<int> &nums, int tar){
            int n = nums.size();
            vector<vector<int>> dp(n+1,vector<int> (tar+1,0));
            if(nums[0] == 0) dp[0][0] =2; ⭐
            else dp[0][0] = 1;     ⭐
            if(nums[0]!=0 && nums[0]<=tar) dp[0][nums[0]] = 1;  ⭐
            
            for(int ind=1;ind<n;ind++){
                for(int t=0;t<=tar;t++){
                    int dtake = 0,take = 0;
                    dtake = dp[ind-1][t];
                    if(nums[ind] <=t) take = dp[ind-1][t-nums[ind]];
                    dp[ind][t] = take+dtake;
                }
            }
            
            return dp[n-1][tar];
        }

    // optimize
        #include <bits/stdc++.h> 
        int findWays(vector<int> &nums, int tar){
            int n = nums.size();
            vector<int> dp(tar+1,0),curr(tar+1,0);
            
            if(nums[0] == 0) dp[0] =2; 
            else dp[0] = 1;     
            if(nums[0]!=0 && nums[0]<=tar) dp[nums[0]] = 1;  
            
            for(int ind=1;ind<n;ind++){
                for(int t=0;t<=tar;t++){
                    int dtake = 0,take = 0;
                    dtake = dp[t];
                    if(nums[ind] <=t) take = dp[t-nums[ind]];
                    curr[t] = take+dtake;
                }
                dp = curr;
            }
            
            return dp[tar];
        }

/* Partitions With Given Difference 
    1. learn this conditoin of exception in recursion and tabulation
    2. sumi - d < 0 or (sumi - d)%2 base condition
    3. use && => ❌ and */
    // brute
        #include <bits/stdc++.h> 
        int M = 1e9+7;
        int pre(int ind,int tar,vector<int>& arr){
            if(ind == 0){ ⭐
                if(tar == 0 and arr[0] == 0) return 2;
                if(tar == 0 or tar == arr[0]) return 1;
                return 0;
            }
            int dtake = 0,take =0;
            dtake = pre(ind-1,tar,arr);
            if(arr[ind] <= tar) take = pre(ind-1,tar-arr[ind],arr);
            return (take + dtake)%M;
        }
        int countPartitions(int n, int d, vector<int> &arr) {
            int sumi = 0;
            for(auto i : arr) sumi += i;
            int tar = (sumi - d)/2;
            if(sumi - d < 0 or (sumi - d)%2) return false; ⭐
            else return pre(n-1,tar,arr);
        }

    // memo
        #include <bits/stdc++.h> 
        int M = 1e9+7;
        int pre(int ind,int tar,vector<int>& arr,vector<vector<int>> & dp){
            if(ind == 0){
                if(tar == 0 and arr[0] == 0) return 2;
                if(tar == 0 or tar == arr[0]) return 1;
                return 0;
            }
            if(dp[ind][tar] != -1) return dp[ind][tar];
            
            int dtake = 0,take =0;
            dtake = pre(ind-1,tar,arr,dp);
            if(arr[ind] <= tar) take = pre(ind-1,tar-arr[ind],arr,dp);
            return dp[ind][tar] = (take + dtake)%M;
        }
        int countPartitions(int n, int d, vector<int> &arr) {
            int sumi = 0;
            for(auto i : arr) sumi += i;
            int tar = (sumi - d)/2;
            if(sumi - d < 0 or (sumi - d)%2) return false;
            else{
                vector<vector<int>> dp(n+1,vector<int> (tar+1,-1));
                return pre(n-1,tar,arr,dp);
            } 
        }

    // tab
        #include <bits/stdc++.h> 
        int M = 1e9+7;
        int countPartitions(int n, int d, vector<int> &arr) {
            int sumi = 0;
            for(auto i : arr) sumi += i;
            int tar = (sumi - d)/2;
            if(sumi - d < 0 or (sumi - d)%2) return false;
            else{
                vector<vector<int>> dp(n+1,vector<int> (tar+1,0));
                if(arr[0] == 0) dp[0][0] = 2;
                else dp[0][0] = 1;
                if(arr[0] != 0 && arr[0] <= tar) dp[0][arr[0]] = 1;
                // if(arr[0]!=0 and arr[0]<=tar) dp[0][arr[0]] = 1;  
                
                for(int i=1;i<n;i++){
                    for(int j=0;j<=tar;j++){
                        int dtake = 0, take = 0;
                        dtake = dp[i-1][j];
                        if(arr[i] <= j) take = dp[i-1][j-arr[i]];
                        dp[i][j] = (take + dtake)%M;
                    }
                }        
                
                return dp[n-1][tar];
            } 
        }
        
    // optimize
        #include <bits/stdc++.h> 
        int M = 1e9+7;
        int countPartitions(int n, int d, vector<int> &arr) {
            int sumi = 0;
            for(auto i : arr) sumi += i;
            int tar = (sumi - d)/2;
            if(sumi - d < 0 or (sumi - d)%2) return false;
            else{
                vector<int> dp(tar+1,0),curr(tar+1,0);
                
                if(arr[0] == 0) dp[0] = 2;
                else dp[0] = 1;
                if(arr[0] != 0 && arr[0] <= tar) dp[arr[0]] = 1;

                for(int i=1;i<n;i++){
                    for(int j=0;j<=tar;j++){
                        int dtake = 0, take = 0;
                        dtake = dp[j];
                        if(arr[i] <= j) take = dp[j-arr[i]];
                        curr[j] = (take + dtake)%M;
                    }
                    dp = curr;
                }        
                
                return dp[tar];
            } 
        }

/* 0 1 Knapsack 
    1. forgot the base condition of recursion
    2. base condition in tab using for loop */
    // brute
        #include <bits/stdc++.h> 
        int pre(int ind,int w,vector<int> &value,vector<int> &weight){
            if(ind == 0){
                if(weight[0] <= w) return value[ind]; ⭐
                return 0;
            }
            int dtake =0,take = 0;
            dtake = 0 + pre(ind-1,w,value,weight);
            if(weight[ind] <= w) take = value[ind] + pre(ind-1,w-weight[ind],value,weight);
            return max(dtake,take);
        }
        int knapsack(vector<int> weight, vector<int> value, int n, int maxWeight){
            return pre(n-1,maxWeight,value,weight);
        }

    // memo 
         #include <bits/stdc++.h> 
        int pre(int ind,int w,vector<int> &value,vector<int> &weight,vector<vector<int>> &dp){
            if(ind == 0){
                if(weight[0] <= w) return value[0];
                return 0;
            }
            if(dp[ind][w] != -1) return dp[ind][w]; 
            int dtake =0,take = INT_MIN; // int_min ⭐
            dtake = 0 + pre(ind-1,w,value,weight,dp);
            if(weight[ind] <= w) take = value[ind] + pre(ind-1,w-weight[ind],value,weight,dp);
            return dp[ind][w] = max(dtake,take);
        }
        int knapsack(vector<int> weight, vector<int> value, int n, int maxWeight){
            vector<vector<int>> dp(n+1,vector<int> (maxWeight+2,-1));
            return pre(n-1,maxWeight,value,weight,dp);
        }

    // tab
        #include <bits/stdc++.h> 
        int knapsack(vector<int> weight, vector<int> value, int n, int W){
            vector<vector<int>> dp(n,vector<int> (W+1,0));    
            
            for(int i=weight[0]; i<=W;i++) dp[0][i] = value[0]; ⭐
            
            for(int ind=1;ind<n;ind++){
                for(int w=0;w<=W;w++){
                    int dtake = 0,take = INT_MIN;
                    dtake = 0 + dp[ind-1][w];
                    if(weight[ind] <= w) take = value[ind] + dp[ind-1][w-weight[ind]];
                    dp[ind][w] = max(dtake,take);
                }
            }
                
            return dp[n-1][W];
        }

    // optimize
         #include <bits/stdc++.h> 
        int knapsack(vector<int> weight, vector<int> value, int n, int W){
            vector<int> dp(W+1,0),curr(W+1,0);
            for(int i=weight[0]; i<=W;i++) dp[i] = value[0];
            for(int ind=1;ind<n;ind++){
                for(int w=0;w<=W;w++){
                    int dtake = 0,take = INT_MIN;
                    dtake = 0 + dp[w];
                    if(weight[ind] <= w) take = value[ind] + dp[w-weight[ind]];
                    curr[w] = max(dtake,take);
                }
                dp = curr;
            }
                
            return dp[W];
        }

/*  Coin Change or Minimum coins 
    1. in recursion code take must be 1e9 not 0 .
    2. if(ans > 1e9- 3) return -1; 
    3. for loop conditon in tab code */
    // brute
        class Solution {
        public:
            int pre(int ind,int tar,vector<int>& coins){
                if(ind == 0){
                    if(tar%coins[0] == 0) return tar/coins[0];
                    return INT_MAX;
                }
                int dtake = 0,take = 1e9; ⭐
                dtake = pre(ind -1,tar,coins);
                if(coins[ind] <= tar) take = 1 + pre(ind,tar-coins[ind],coins);
                return min(dtake, take);    
            }
            int coinChange(vector<int>& coins, int amount) {
                int n =coins.size();
                return pre(n-1,amount,coins);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int tar,vector<int>& coins,vector<vector<int>> &dp){
                if(ind == 0){
                    if(tar%coins[0] == 0) return tar/coins[0];
                    return INT_MAX;
                }
                if(dp[ind][tar] != -1) return dp[ind][tar];
                int dtake = 0,take = 1e9;
                dtake = pre(ind -1,tar,coins,dp);
                if(coins[ind] <= tar) take = 1 + pre(ind,tar-coins[ind],coins,dp);
                return dp[ind][tar] = min(dtake, take);    
            }
            int coinChange(vector<int>& coins, int amount) {
                int n =coins.size();
                vector<vector<int>> dp(n+1,vector<int> (amount+1,-1));
                int ans = pre(n-1,amount,coins,dp);
                if(ans > 1e9- 3) return -1; ⭐
                else return ans;
            }
        };

    // tab
        class Solution {
        public:
            int coinChange(vector<int>& coins, int amount) {
                int n =coins.size();
                vector<vector<int>> dp(n+1,vector<int> (amount+1,0));
                for(int i=0;i<=amount;i++){
                    if(i%coins[0] == 0) dp[0][i] = i/coins[0];  ⭐
                    else dp[0][i] = 1e9;
                }
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=amount;tar++){
                        int dtake = 0,take = 1e9;
                        dtake = dp[ind -1][tar];
                        if(coins[ind] <= tar) take = 1 + dp[ind][tar-coins[ind]];
                        dp[ind][tar] = min(dtake, take);    
                    }
                }
                
                int ans = dp[n-1][amount];
                if(ans > 1e9- 3) return -1;
                else return ans;
            }
        };

    // optimize
        class Solution {
        public:
            int coinChange(vector<int>& coins, int amount) {
                int n =coins.size();
                vector<int> dp(amount+1,0),curr(amount+1,0);
                for(int i=0;i<=amount;i++){
                    if(i%coins[0] == 0) dp[i] = i/coins[0];
                    else dp[i] = 1e9;
                }
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=amount;tar++){
                        int dtake = 0,take = 1e9;
                        dtake = dp[tar];
                        if(coins[ind] <= tar) take = 1 + curr[tar-coins[ind]];
                        curr[tar] = min(dtake, take);    
                    }
                    dp = curr;
                }
                
                int ans = dp[amount];
                if(ans > 1e9- 3) return -1;
                else return ans;
            }
        };
/* Target Sum
    1. wrong condition where and => or .
    2. some while confusion of what would be the target be passed. */
    // memo
        class Solution {
        public:
            int pre(int ind,int tar,vector<int>& nums,vector<vector<int>> &dp){
                if(ind == 0){
                    if(tar == 0 && nums[0] == 0) return 2;
                    if(tar == 0 or tar == nums[0]) return 1; // ⭐
                    return 0;
                }
                if(dp[ind][tar] != -1) return dp[ind][tar];
                
                int take = 0,dtake = 0;
                dtake = pre(ind-1,tar,nums,dp);
                if(nums[ind] <= tar) take = pre(ind-1,tar-nums[ind],nums,dp);
                
                return dp[ind][tar] = take+dtake;
            }
            int findWays(vector<int> & nums,int target){
                int n = nums.size();
                vector<vector<int>> dp(n+1,vector<int> (target+1,-1));
                return pre(n-1,target,nums,dp);
            }
            int findTargetSumWays(vector<int>& nums, int target) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                int tar = ( sumi - target ) / 2;
                if(sumi - target < 0 or (sumi - target)%2){
                    return 0;
                }else return findWays(nums,tar);
            }
        };

    // tab
        class Solution {
        public:
            int findWays(vector<int> & nums,int target){
                int n = nums.size();
                vector<vector<int>> dp(n+1,vector<int> (target+1,0));
                
                if(nums[0] == 0) dp[0][0] =2;
                else dp[0][0] = 1;
                if(nums[0] != 0 && nums[0] <= target) dp[0][nums[0]] = 1;
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=target;tar++){
                        int take = 0,dtake =0;
                        dtake = dp[ind-1][tar];
                        if(nums[ind] <= tar) take = dp[ind-1][tar-nums[ind]];
                        dp[ind][tar] = take + dtake;
                    }
                }
                
                return dp[n-1][target];
            }
            int findTargetSumWays(vector<int>& nums, int target) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                int tar = ( sumi - target ) / 2;
                if(sumi - target < 0 or (sumi - target)%2){
                    return 0;
                }else return findWays(nums,tar);
            }
        };
        
    // optimize
        class Solution {
        public:
            int findWays(vector<int> & nums,int target){
                int n = nums.size();
                vector<int> dp(target+1,0),curr(target+1,0);
                
                if(nums[0] == 0) dp[0] =2;
                else dp[0] = 1;
                if(nums[0] != 0 && nums[0] <= target) dp[nums[0]] = 1;
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=target;tar++){
                        int take = 0,dtake =0;
                        dtake = dp[tar];
                        if(nums[ind] <= tar) take = dp[tar-nums[ind]];
                        curr[tar] = take + dtake;
                    }
                    dp = curr;
                }
                
                return dp[target];
            }
            int findTargetSumWays(vector<int>& nums, int target) {
                int sumi = 0;
                for(auto i : nums) sumi += i;
                int tar = ( sumi - target ) / 2;
                if(sumi - target < 0 or (sumi - target)%2){
                    return 0;
                }else return findWays(nums,tar);
            }
        };

/* Coin Change II or ways to make coin change
    1. for loop conversion error in tab
        for(int i=0;i<=amount;i++) if(i%coins[0] == 0) dp[0][i] = 1; =>
        for(int i=0;i<amount;i++) if(i%coins[0] == 0) dp[0][i] = 1;
    */
    // brute
        class Solution {
        public:
            int pre(int ind,int tar,vector<int>& coins){
                if(tar == 0) return 1;
                if(ind == 0) return (tar%coins[0] == 0);
                
                int take = 0,dtake = 0;
                dtake = pre(ind-1,tar,coins);
                if(coins[ind] <= tar) take = pre(ind,tar-coins[ind],coins);
                return dp[ind][tar] = take + dtake;
            }
            int change(int amount, vector<int>& coins) {
                int n = coins.size();
                return pre(n-1,amount,coins);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int tar,vector<int>& coins,vector<vector<int>> &dp){
                if(tar == 0) return 1;
                if(ind == 0) return (tar%coins[0] == 0);
                
                if(dp[ind][tar] != -1) return dp[ind][tar];
                
                int take = 0,dtake = 0;
                dtake = pre(ind-1,tar,coins,dp);
                if(coins[ind] <= tar) take = pre(ind,tar-coins[ind],coins,dp);
                return dp[ind][tar] = take + dtake;
            }
            int change(int amount, vector<int>& coins) {
                int n = coins.size();
                vector<vector<int>> dp(n+1,vector<int> (amount+1,-1));
                return pre(n-1,amount,coins,dp);
            }
        };

    // tab
        class Solution {
        public:
            int change(int amount, vector<int>& coins) {
                int n = coins.size();
                vector<vector<int>> dp(n,vector<int> (amount+1,0));
                
                for(int i=0;i<n;i++) dp[i][0] = 1;
                for(int i=0;i<=amount;i++) if(i%coins[0] == 0) dp[0][i] = 1;
                // for(int i=0;i<amount;i++) if(i%coins[0] == 0) dp[0][i] = 1; ⭐
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=amount;tar++){
                        int take = 0,dtake = 0;
                        dtake = dp[ind-1][tar];
                        if(coins[ind] <= tar) take = dp[ind][tar-coins[ind]];
                        dp[ind][tar] = take + dtake;
                    }
                }
                
                return dp[n-1][amount];
            }
        };

    // optimize 2d array
        class Solution {
        public:
            int change(int amount, vector<int>& coins) {
                int n = coins.size();
                vector<int> dp(amount+1,0),curr(amount+1,0);
                
                dp[0] = 1;
                for(int i=0;i<=amount;i++) if(i%coins[0] == 0) dp[i] = 1;
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=amount;tar++){
                        int take = 0,dtake = 0;
                        dtake = dp[tar];
                        if(coins[ind] <= tar) take = curr[tar-coins[ind]];
                        curr[tar] = take + dtake;
                    }
                    dp = curr;
                }
                
                return dp[amount];
            }
        };

    // optimized 1d array
        class Solution {
        public:
            int change(int amount, vector<int>& coins) {
                int n = coins.size();
                vector<int> dp(amount+1,0);
                
                dp[0] = 1;
                for(int i=0;i<=amount;i++) if(i%coins[0] == 0) dp[i] = 1;
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=amount;tar++){
                        int take = 0,dtake = 0;
                        dtake = dp[tar];
                        if(coins[ind] <= tar) take = dp[tar-coins[ind]];
                        dp[tar] = take + dtake;
                    }
                }
                
                return dp[amount];
            }
        };

/* Knapsack with Duplicate Items or unbouned knapsack
    1. for(int i=0;i<w;i++) => for(int i=0;i<=w;i++) tab code */
    // brute
        class Solution{
        public:
            int pre(int ind,int tar,int val[],int wt[]){
                if(tar == 0) return 0;
                if(ind == 0){
                    return (tar/wt[ind])*val[ind];
                }
                int dtake = 0, take = INT_MIN;
                dtake = pre(ind-1,tar,val,wt);
                if(wt[ind] <= tar) take = val[ind] + pre(ind,tar-wt[ind],val,wt);
                return max(dtake,take);
            }
            int knapSack(int n, int w, int val[], int wt[]){
                
                return pre(n-1,w,val,wt);
            }
        };

    // memo
        class Solution{
        public:
            int pre(int ind,int tar,int val[],int wt[],vector<vector<int>> &dp){
                if(tar == 0) return 0;
                if(ind == 0){
                    return (tar/wt[ind])*val[ind];
                }
                if(dp[ind][tar] != -1) return dp[ind][tar];
                
                int dtake = 0, take = INT_MIN;
                dtake = pre(ind-1,tar,val,wt,dp);
                if(wt[ind] <= tar) take = val[ind] + pre(ind,tar-wt[ind],val,wt,dp);
                return dp[ind][tar] = max(dtake,take);
            }
            int knapSack(int n, int w, int val[], int wt[]){
                vector<vector<int>> dp(n+1,vector<int> (w+2,-1));
                return pre(n-1,w,val,wt,dp);
            }
        };

    // tab
        class Solution{
        public:
            int knapSack(int n, int w, int val[], int wt[]){
                vector<vector<int>> dp(n+1,vector<int> (w+2,0));
                
                for(int i=0;i<n;i++) dp[i][0] = 0;
                for(int i=0;i<=w;i++){ // ⭐
                    dp[0][i] = (i/wt[0])*val[0];
                }
                
                // if(ind == 0){
                //     return (tar/wt[ind])*val[ind];
                // }
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=w;tar++){
                        int dtake = 0, take = INT_MIN;
                        dtake = dp[ind-1][tar];
                        if(wt[ind] <= tar) take = val[ind] + dp[ind][tar-wt[ind]];
                        dp[ind][tar] = max(dtake,take);
                    }
                }
                
                return dp[n-1][w];
            }
        };
    // optimize 2d array 
        class Solution{
        public:
            int knapSack(int n, int w, int val[], int wt[]){
                vector<int> dp(w+2,0),curr(w+2,0);
                
                dp[0] = 0;
                for(int i=0;i<=w;i++){ 
                    dp[i] = (i/wt[0])*val[0];
                }
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=w;tar++){
                        int dtake = 0, take = INT_MIN;
                        dtake = dp[tar];
                        if(wt[ind] <= tar) take = val[ind] + curr[tar-wt[ind]];
                        curr[tar] = max(dtake,take);
                    }
                    dp = curr;
                }
                
                return dp[w];
            }
        };
    
    // optimize 1d array
        class Solution{
        public:
            int knapSack(int n, int w, int val[], int wt[]){
                vector<int> dp(w+2,0),curr(w+2,0);
                
                dp[0] = 0;
                for(int i=0;i<=w;i++){ 
                    dp[i] = (i/wt[0])*val[0];
                }
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=w;tar++){
                        int dtake = 0, take = INT_MIN;
                        dtake = dp[tar];
                        if(wt[ind] <= tar) take = val[ind] + curr[tar-wt[ind]];
                        curr[tar] = max(dtake,take);
                    }
                    dp = curr;
                }
                
                return dp[w];
            }
        };

/* Rod cutting problem 
    1. don't know aproach and code a lost of error ⭐  
    2. if(ind == 0) return tar*price[0]; base condition not written
    3. if(ind <= tar) => if(ind + 1 <= tar)
    4. pre(ind-1,tar-ind,price) => pre(ind-1,tar-(ind+1),price)
    5. pre(ind-1,tar-(ind+1),price) => pre(ind,tar-(ind+1),price)
    6. for condition of tab */
    // brute
        int pre(int ind,int tar,vector<int> & price){
            if(ind == 0) return tar*price[0];

            int dtake = 0,take = INT_MIN;
            dtake = pre(ind-1,tar,price);
            if(ind + 1 <= tar) take = price[ind] + pre(ind,tar-(ind+1),price);
            return max(dtake,take);
        }
        int cutRod(vector<int> &price, int n){
            return pre(n-1,n,price);
        }

        // striver recursion

        int cutRodUtil(vector<int>& price, int ind, int N, vector<vector<int>>& dp){

            if(ind == 0){
                return N*price[0];
            }
            
            if(dp[ind][N]!=-1)
                return dp[ind][N];
                
            int notTaken = 0 + cutRodUtil(price,ind-1,N,dp);
            
            int taken = INT_MIN;
            int rodLength = ind+1;
            if(rodLength <= N)
                taken = price[ind] + cutRodUtil(price,ind,N-rodLength,dp);
                
            return dp[ind][N] = max(notTaken,taken);
        }

    // memo
        class Solution{
        public:
            int pre(int ind,int tar,int price[],vector<vector<int>> &dp){
                if(ind == 0) return tar*price[0];
                if(dp[ind][tar] != -1) return dp[ind][tar];
            
                int dtake = 0,take = INT_MIN;
                dtake = pre(ind-1,tar,price,dp);
                if(ind + 1 <= tar) take = price[ind] + pre(ind,tar-(ind+1),price,dp);
                return dp[ind][tar] = max(dtake,take);
            }
            int cutRod(int price[], int n) {
                vector<vector<int>> dp(n+1,vector<int> (n+1,-1));
                return pre(n-1,n,price,dp);
            }
        };

    // tab
        class Solution{
        public:
            int cutRod(int price[], int n) {
                vector<vector<int>> dp(n+1,vector<int> (n+1,0));
                for(int i=0;i<=n;i++) dp[0][i] = i*price[0]; ⭐
                // if(ind == 0) return tar*price[0];
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=n;tar++){
                        int dtake = 0,take = INT_MIN;
                        dtake = dp[ind-1][tar];
                        if(ind + 1 <= tar) take = price[ind] + dp[ind][tar-(ind+1)];
                        dp[ind][tar] = max(dtake,take);
                    }
                }
                return dp[n-1][n];
            }
        };

    // optimize 2d array
        class Solution{
        public:
            int cutRod(int price[], int n) {
                vector<int> dp(n+1,0), curr(n+1,0);
                for(int i=0;i<=n;i++) dp[i] = i*price[0];
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=n;tar++){
                        int dtake = 0,take = INT_MIN;
                        dtake = dp[tar];
                        if(ind + 1 <= tar) take = price[ind] + curr[tar-(ind+1)];
                        curr[tar] = max(dtake,take);
                    }
                    dp = curr;
                }
                return dp[n];
            }
        };

    // optimized 1d array
        class Solution{
        public:
            int cutRod(int price[], int n) {
                vector<int> dp(n+1,0);
                for(int i=0;i<=n;i++) dp[i] = i*price[0];
                
                for(int ind=1;ind<n;ind++){
                    for(int tar=0;tar<=n;tar++){
                        int dtake = 0,take = INT_MIN;
                        dtake = dp[tar];
                        if(ind + 1 <= tar) take = price[ind] + dp[tar-(ind+1)];
                        dp[tar] = max(dtake,take);
                    }
                }
                return dp[n];
            }
        };

/* longest common subsequence 
    0. writing base condition wrong
    1. (ind1 < 0 or ind2 < 0) => (ind1 == 0 or ind2 == 0) , base condition
    2. (s1[ind1] == s2[ind2]) => (s1[ind1-1] == s2[ind2-1]) , comparision
    3. n => n + 1 , during dp decleration
    4. for i -> n : (not n-1)
        for j -> m : (not m-1)
    5. forgot base case in recursion and else part also
    */
    // brute   
        class Solution {
        public:
            int pre(int ind1,int ind2,string & s1,string & s2){
                if(ind1 < 0 or ind2 < 0) return 0; // ⭐
                if(s1[ind1] == s2[ind2])
                    return 1 + pre(ind1-1,ind2-1,s1,s2);
                else return max(pre(ind1-1,ind2,s1,s2),pre(ind1,ind2-1,s1,s2)); // ⭐
            }
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size();
                int m = s2.size();
                vector<vector<int>> dp(n,vector<int> (m+1,-1));
                return pre(n-1,m-1,s1,s2);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind1,int ind2,string & s1,string & s2,vector<vector<int>> &dp){
                if(ind1 < 0 or ind2 < 0) return 0;
                if(dp[ind1][ind2] != -1) return dp[ind1][ind2];
                if(s1[ind1] == s2[ind2])
                    return 1 + pre(ind1-1,ind2-1,s1,s2,dp);
                else return dp[ind1][ind2] = max(pre(ind1-1,ind2,s1,s2,dp),pre(ind1,ind2-1,s1,s2,dp));
            }
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size();
                int m = s2.size();
                vector<vector<int>> dp(n,vector<int> (m+1,-1));
                return pre(n-1,m-1,s1,s2,dp);
            }
        };

    // memo code with index change
        class Solution {
        public:
            int pre(int ind1,int ind2,string & s1,string & s2,vector<vector<int>> &dp){
                if(ind1 == 0 or ind2 == 0) return 0; // ⭐
                if(dp[ind1][ind2] != -1) return dp[ind1][ind2];
                if(s1[ind1-1] == s2[ind2-1]) // ⭐
                    return 1 + pre(ind1-1,ind2-1,s1,s2,dp);
                else return dp[ind1][ind2] = max(pre(ind1-1,ind2,s1,s2,dp),pre(ind1,ind2-1,s1,s2,dp));
            }
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size(), m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1)); // ⭐
                return pre(n,m,s1,s2,dp);
            }
        };

    // tab
        class Solution {
        public:
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size(), m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                                    
                for(int ind1=1;ind1<=n;ind1++){
                    for(int ind2=1;ind2<=m;ind2++){
                        if(s1[ind1-1] == s2[ind2-1])
                            dp[ind1][ind2] = dp[ind1-1][ind2-1] + 1;
                        else dp[ind1][ind2] = max(dp[ind1-1][ind2],dp[ind1][ind2-1]);
                    }
                }
                            
                return dp[n][m];
            }
        };

    // optimize
        class Solution {
        public:
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size(), m = s2.size();
                vector<int> dp(m+1,0),curr(m+1,0);
                                    
                for(int ind1=1;ind1<=n;ind1++){ // ⭐
                    for(int ind2=1;ind2<=m;ind2++){ // ⭐ 
                        if(s1[ind1-1] == s2[ind2-1])
                            curr[ind2] = dp[ind2-1] + 1;
                        else curr[ind2] = max(dp[ind2],curr[ind2-1]);
                    }
                    dp = curr;
                }
                            
                return dp[m];
            }
        };

/* Printing longest common subsequence */
    // optimal
        class Solution {
        public:
            int longestCommonSubsequence(string s1, string s2) {
                int n = s1.size(), m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                                    
                for(int ind1=1;ind1<=n;ind1++){
                    for(int ind2=1;ind2<=m;ind2++){
                        if(s1[ind1-1] == s2[ind2-1])
                            dp[ind1][ind2] = dp[ind1-1][ind2-1] + 1;
                        else dp[ind1][ind2] = max(dp[ind1-1][ind2],dp[ind1][ind2-1]);
                    }
                }
                int i=n,j=m;
                string s="";
                while(i > 0 and j > 0){
                    if(s1[i] == s2[j]){
                        s.push_back(s1[i]);
                        i--,j--;
                    }else if(dp[i-1][j] > dp[i][j-1]){
                        i--;
                    }else{
                        j--;
                    }
                }
                reverse(s.begin(),s.end());
                cout<<s<<endl;
                return dp[n][m];
            }
        };

/* Printing longest common subsequence all 🔺 */
/* Longest Common Substring 
    1. approach unique
    2. res maintain and store in the incremented value ( res = incremented)
    3. else case have the maximum
    4. tab code , (s1[i] == s2[j]) => (s1[i-1] == s2[j-1])
    */
    // brute ❌
        #include <bits/stdc++.h> 
        int pre(int i,int j,string &s1,string &s2,int res){
            if(i < 0 or j < 0) return res;
            if(s1[i] == s2[j]){
                res = pre(i-1,j-1,s1,s2,res+1); // ⭐
            }    
            return max({res,pre(i-1,j,s1,s2,0),pre(i,j-1,s1,s2,0)});  // ⭐
        }
        int lcs(string &s1, string &s2){
            int n = s1.size(),m = s2.size();
            return pre(n-1,m-1,s1,s2,0);
        }

    // memo : ❌ not working testcase ( str1 = "bc" , str2 = "bcbccc" => 1)
    // tab
        #include <bits/stdc++.h> 
        int lcs(string &s1, string &s2){
            int n = s1.size(),m = s2.size();
            vector<vector<int>> dp(n+1,vector<int> (m+1,0));
            int maxi = 0;
            for(int i=1;i<=n;i++){
                for(int j=1;j<=m;j++){
                    if(s1[i-1] == s2[j-1]){ // ⭐ 
                        dp[i][j] = 1 + dp[i-1][j-1];
                    }else dp[i][j] = 0;
                    maxi = max(maxi,dp[i][j]);
                }
            }
            return maxi;    
        }

    // optmize
        #include <bits/stdc++.h> 
        int lcs(string &s1, string &s2){
            int n = s1.size(),m = s2.size();
            vector<int> dp(m+1,0),curr(m+1,0);
            
            int maxi = 0;
            for(int i=1;i<=n;i++){
                for(int j=1;j<=m;j++){
                    if(s1[i-1] == s2[j-1]){ // ⭐ 
                        curr[j] = 1 + dp[j-1];
                    }else curr[j] = 0;
                    maxi = max(maxi,curr[j]);
                }
                dp = curr;
            }
            return maxi;    
        }

// Longest Palindromic Subsequence
    // memo
        class Solution {
        public:
            int pre(int i,int j,string &s1,string &s2,vector<vector<int>> &dp){
                if(i == 0 or j == 0) return 0;
                if(dp[i][j] != -1) return dp[i][j];
            
                if(s1[i-1] == s2[j-1])
                    return dp[i][j] = 1 + pre(i-1,j-1,s1,s2,dp);
                else return dp[i][j] = max(pre(i-1,j,s1,s2,dp),pre(i,j-1,s1,s2,dp)); 
            }
            int common(string &s1,string &s2){
                int n = s1.size(), m= s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n,m,s1,s2,dp);
            }
            int longestPalindromeSubseq(string s) {
                string str1 = s,str2 = s;
                reverse(str1.begin(),str1.end());
                return common(str1,str2);
            }
        };

    // tab
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n = s1.size(), m= s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            dp[i][j] = 1 + dp[i-1][j-1];
                        else dp[i][j] = max(dp[i-1][j],dp[i][j-1]);
                    }
                }
                
                return dp[n][m];
            }
            int longestPalindromeSubseq(string s) {
                string str1 = s,str2 = s;
                reverse(str1.begin(),str1.end());
                return common(str1,str2);
            }
        };

    // optimize
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n = s1.size(), m= s2.size();
                vector<int> dp(m+1,0),curr(m+1,0);
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            curr[j] = 1 + dp[j-1];
                        else curr[j] = max(dp[j],curr[j-1]);
                    }
                    dp = curr;
                }
                
                return dp[m];
            }
            int longestPalindromeSubseq(string s) {
                string str1 = s,str2 = s;
                reverse(str1.begin(),str1.end());
                return common(str1,str2);
            }
        };

// Minimum Insertion Steps to Make a String Palindrome
    // memo
        class Solution {
        public:
            int pre(int i,int j,string & s1,string & s2,vector<vector<int>> & dp){
                if(i == 0 or j == 0) return 0;
                if(dp[i][j] != -1) return dp[i][j];
                
                if(s1[i-1] == s2[j-1])
                    return dp[i][j] = 1 + pre(i-1,j-1,s1,s2,dp);
                else return dp[i][j] = max(pre(i-1,j,s1,s2,dp),pre(i,j-1,s1,s2,dp));
            }
            int common(string &s1,string &s2){
                int n= s1.size(),m = s1.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n,m,s1,s2,dp);        
            }
            int minInsertions(string s) {
                string s1=s,s2 =s;
                reverse(s1.begin(),s1.end());
                return s.size() - common(s1,s2);
            }
        };

    // tab
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n= s1.size(),m = s1.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            dp[i][j]= 1 + dp[i-1][j-1];
                        else dp[i][j] = max(dp[i-1][j],dp[i][j-1]);
                    }
                }
                
                return dp[n][m];
            }
            int minInsertions(string s) {
                string s1=s,s2 =s;
                reverse(s1.begin(),s1.end());
                return s.size() - common(s1,s2);
            }
        };
    
    // optimize
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n= s1.size(),m = s1.size();
                // vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                vector<int> dp(m+1,0),curr(m+1,0);
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            curr[j]= 1 + dp[j-1];
                        else curr[j] = max(dp[j],curr[j-1]);
                    }
                    dp = curr;
                }
                
                return dp[m];
            }
            int minInsertions(string s) {
                string s1=s,s2 =s;
                reverse(s1.begin(),s1.end());
                return s.size() - common(s1,s2);
            }
        };

// Delete Operation for Two Strings
    // brute
        class Solution {
        public:
            int pre(int i,int j,string & s1,string & s2){
                if(i == 0 or j == 0) return 0;
                
                if(s1[i-1] == s2[j-1])
                    return 1 + pre(i-1,j-1,s1,s2);
                else return max(pre(i-1,j,s1,s2),pre(i,j-1,s1,s2));
            }
            int common(string &s1,string &s2){
                int n = s1.size(),m = s2.size();
                return pre(n,m,s1,s2);        
            }
            int minDistance(string word1, string word2) {
                return word1.size() + word2.size() - 2*common(word1,word2);   
            }
        };

    // memo
        class Solution {
        public:
            int pre(int i,int j,string & s1,string & s2,vector<vector<int>> &dp){
                if(i == 0 or j == 0) return 0;
                if(dp[i][j] != -1) return dp[i][j];
                
                if(s1[i-1] == s2[j-1])
                    return dp[i][j] = 1 + pre(i-1,j-1,s1,s2,dp);
                else return dp[i][j] = max(pre(i-1,j,s1,s2,dp),pre(i,j-1,s1,s2,dp));
            }
            int common(string &s1,string &s2){
                int n = s1.size(),m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n,m,s1,s2,dp);        
            }
            int minDistance(string word1, string word2) {
                return word1.size() + word2.size() - 2*common(word1,word2);   
            }
        };

    // tab
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n = s1.size(),m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            dp[i][j]= 1 + dp[i-1][j-1];
                        else
                            dp[i][j]= max(dp[i-1][j],dp[i][j-1]);
                    }
                }
                
                return dp[n][m];
            }
            int minDistance(string word1, string word2) {
                return word1.size() + word2.size() - 2*common(word1,word2);   
            }
        };
        
    // optimize
        class Solution {
        public:
            int common(string &s1,string &s2){
                int n = s1.size(),m = s2.size();
                vector<int> dp(m+1,0),curr(m+1,0);
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            curr[j]= 1 + dp[j-1];
                        else
                            curr[j]= max(dp[j],curr[j-1]);
                    }
                    dp = curr;
                }
                
                return dp[m];
            }
            int minDistance(string word1, string word2) {
                return word1.size() + word2.size() - 2*common(word1,word2);   
            }
        };

/* Shortest Common Supersequence 
    1. don't know have any aproach
    2. both approach were forgoten */
    // striver
        class Solution {
        public:
            string shortestCommonSupersequence(string str1, string str2) {
                int n = str1.size(),m = str2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(str1[i-1] == str2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
                        else dp[i][j] = max(dp[i-1][j],dp[i][j-1]);
                    }
                }
                
                string res = "";
                int i=n,j=m;
                while(i > 0 and j > 0){
                    if(str1[i-1] == str2[j-1]){
                        res.push_back(str1[i-1]);
                        i--,j--;
                    }else if(dp[i-1][j] > dp[i][j-1]){
                        res.push_back(str1[i-1]);
                        i--;
                    }else{
                        res.push_back(str2[j-1]);
                        j--;
                    }
                }
                
                while(i > 0){ res.push_back(str1[i-1]); i--; }
                while(j > 0){ res.push_back(str2[j-1]); j--; }
                
                reverse(res.begin(),res.end());
                return res;
            }
        };

    // mine
        class Solution {
        public:
            string shortestCommonSupersequence(string str1, string str2) {
                int n = str1.size(),m = str2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(str1[i-1] == str2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
                        else dp[i][j] = max(dp[i-1][j],dp[i][j-1]);
                    }
                }
                
                string res = "";
                int i=n,j=m;
                while(i > 0 and j > 0){
                    if(str1[i-1] == str2[j-1]){
                        res.push_back(str1[i-1]);
                        i--,j--;
                    }else if(dp[i-1][j] > dp[i][j-1]) i--;
                    else j--;
                }
                
                reverse(res.begin(),res.end());
                
                string ans ="";
                i = 0,j = 0;
                int ind = 0;
                while(i < str1.size() or j < str2.size()){
                    if(str1[i] == res[ind] and str2[j] == res[ind]){
                        ans.push_back(res[ind]);
                        ind++,i++,j++;
                    } 
                    if(str1[i] != res[ind] and str2[j] != res[ind]){
                        ans.push_back(str1[i]);
                        ans.push_back(str2[j]);
                        i++,j++;
                    }
                    else if(str1[i] != res[ind]){
                        ans.push_back(str1[i]);
                        i++; 
                    }else if(str2[j] != res[ind]){
                        ans.push_back(str2[j]);
                        j++;
                    }
                }
                
                return ans;
            }
        };

/* Distinct Subsequences 
    1. don't remember the approach 
    2. if(i < 0 or j < 0) => if(j < 0) <- 1, if(i < 0) <= 0
    3. pre(i-1,j-1,s,t) => pre(i-1,j-1,s,t) + pre(i-1,j,s,t) 
    4. pre(i,j-1,s,t) + pre(i-1,j,s,t) => pre(i-1,j,s,t) 
    5. for(int j=0;j<=m;j++) => for(int j=1;j<=m;j++) */
    // brute 0 based indexing
        int M = 1e9+7;
        class Solution {
        public:
            int pre(int i,int j,string &s,string &t){
                if(j < 0) return 1; // ⭐
                if(i < 0) return 0; // ⭐
                
                if(s[i] == t[j])
                    return (pre(i-1,j-1,s,t) + pre(i-1,j,s,t))%M;// ⭐
                else return pre(i-1,j,s,t); // ⭐
            }
            int numDistinct(string s, string t) {
                int n = s.size(),m = t.size();
                return pre(n-1,m-1,s,t);
            }
        };

    // brute 1 based indexing
        int M = 1e9+7;
        class Solution {
        public:
            int pre(int i,int j,string &s,string &t){
                if(j == 0) return 1;
                if(i == 0) return 0;
                
                if(s[i-1] == t[j-1])
                    return (pre(i-1,j-1,s,t) + pre(i-1,j,s,t))%M;
                else return pre(i-1,j,s,t);
            }
            int numDistinct(string s, string t) {
                int n = s.size(),m = t.size();
                return pre(n,m,s,t);
            }
        };

    // memo
        int M = 1e9+7;
        class Solution {
        public:
            int pre(int i,int j,string &s,string &t,vector<vector<int>> &dp){
                if(j == 0) return 1;
                if(i == 0) return 0;
                
                if(dp[i][j] != -1) return dp[i][j];
                
                if(s[i-1] == t[j-1])
                    return dp[i][j] = (pre(i-1,j-1,s,t,dp) + pre(i-1,j,s,t,dp))%M;
                else return dp[i][j] = pre(i-1,j,s,t,dp);
            }
            int numDistinct(string s, string t) {
                int n = s.size(),m = t.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return pre(n,m,s,t,dp);
            }
        };

    // tab
        int M = 1e9+7;
        class Solution {
        public:
            int numDistinct(string s, string t) {
                int n = s.size(),m = t.size();
                vector<vector<int>> dp(n+2,vector<int> (m+2,0));
                
                for(int i=0;i<=n;i++) dp[i][0] =1;
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){ // ⭐
                        if(s[i-1] == t[j-1])
                            dp[i][j] = (dp[i-1][j-1] + dp[i-1][j])%M;
                        else dp[i][j] = dp[i-1][j];   
                    }
                }
                
                return dp[n][m];
            }
        };
    // optimize
        int M = 1e9+7;
        class Solution {
        public:
            int numDistinct(string s, string t) {
                int n = s.size(),m = t.size();
                vector<int> dp(m+2,0),curr(m+2,0);
                
                dp[0] =1;
                curr[0] = 1;
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){ 
                        if(s[i-1] == t[j-1])
                            curr[j] = (dp[j-1] + dp[j])%M;
                        else curr[j] = dp[j];   
                    }
                    dp = curr;
                }
                
                return dp[m];
            }
        };

/* Edit Distance
    1. no idea of basic case 
        recursion code of 0 based indexing
    2. if(i < 0 or j < 0) <- 0 => if(i < 0) <- j+1 , if(j < 0) <- i+1
    3. <- 1 + common(i-1,j-1,s1,s2), min(common(i-1,j,s1,s2),common(i,j-1,s1,s2)) => min({ 1 + common(i-1,j,s1,s2) , 1 + common(i,j-1,s1,s2) , 1 + common(i-1,j-1,s1,s2) })
        recursion code of 1 based indexing
    4. base conditon
        if(i == 0) <- j+1 , if(j == 0) <- i+1 => if(i == 0) <- j , if(j == 0) <- i
    5. writing base condtion of optimize 
        curr[0] = 1 => curr[0] = i;

        */
    // brute 0 index : TLE
        class Solution {
        public:
            int common(int i,int j,string &s1,string &s2){
                if(i < 0) return j+1;  // ⭐
                if(j < 0) return i+1;  // ⭐
                
                if(s1[i] == s2[j])
                    return 0 + common(i-1,j-1,s1,s2);  // ⭐
                else return min({ 1 + common(i-1,j,s1,s2) , 1 + common(i,j-1,s1,s2) , 1 + common(i-1,j-1,s1,s2) }); // ⭐
                        //              delete              insert                        replace
            }
            int minDistance(string s1, string s2) {
                int n = s1.size(),m = s2.size();
                return common(n-1,m-1,s1,s2);
            }
        };
    
    // brute 1 indexing : TLE
        class Solution {
        public:
            int common(int i,int j,string &s1,string &s2){
                if(i == 0) return j;  // ⭐
                if(j == 0) return i;  // ⭐
                
                if(s1[i-1] == s2[j-1])
                    return 0 + common(i-1,j-1,s1,s2);
                else return min({ 1 + common(i-1,j,s1,s2) , 1 + common(i,j-1,s1,s2) , 1 + common(i-1,j-1,s1,s2) });
                        //              delete              insert                        replace
            }
            int minDistance(string s1, string s2) {
                int n = s1.size(),m = s2.size();
                return common(n,m,s1,s2);
            }
        };

    // memo
        class Solution {
        public:
            int common(int i,int j,string &s1,string &s2,vector<vector<int>> &dp){
                if(i == 0) return j;
                if(j == 0) return i;
                
                if(dp[i][j] != -1) return dp[i][j];
                if(s1[i-1] == s2[j-1])
                    return dp[i][j] = 0 + common(i-1,j-1,s1,s2,dp);
                else return dp[i][j] = min({ 1 + common(i-1,j,s1,s2,dp) , 1 + common(i,j-1,s1,s2,dp) , 1 + common(i-1,j-1,s1,s2,dp) });
                    
            }
            int minDistance(string s1, string s2) {
                int n = s1.size(),m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,-1));
                return common(n,m,s1,s2,dp);
            }
        };

    // tab
        class Solution {
        public:
            int minDistance(string s1, string s2) {
                int n = s1.size(),m = s2.size();
                vector<vector<int>> dp(n+1,vector<int> (m+1,0));
                
                for(int i=0;i<=n;i++) dp[i][0] = i;
                for(int j=0;j<=m;j++) dp[0][j] = j;
                
                for(int i=1;i<=n;i++){
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            dp[i][j] = dp[i-1][j-1];
                        else
                            dp[i][j] = min({1 + dp[i-1][j],1 + dp[i][j-1], 1 + dp[i-1][j-1]});
                    }
                }
                
                
                return dp[n][m];
            }
        };

    // optimize
        class Solution {
        public:
            int minDistance(string s1, string s2) {
                int n = s1.size(),m = s2.size();
                vector<int> dp(m+1,0),curr(m+1,0);
                
                // curr[0] = 1; ⭐
                for(int j=0;j<=m;j++) dp[j] = j;
                
                for(int i=1;i<=n;i++){
                    curr[0] = i; // ⭐
                    for(int j=1;j<=m;j++){
                        if(s1[i-1] == s2[j-1])
                            curr[j] = dp[j-1];
                        else
                            curr[j] = min({1 + dp[j],1 + curr[j-1], 1 + dp[j-1]});
                    }
                    dp = curr;
                }
                
                
                return dp[m];
            }
        };

/* Wildcard Matching 🔺
    1. no intuition behind
    2. almost very wrong to the solution */
    // wrong intuition
        class Solution {
        public:
            int pre(int i,int j,string & s,string & p){
                if(j < 0) return 1;
                if(i < 0) return 0;
                
                if(s[i] == s[j] or s[j] == '?'){
                    return pre(i-1,j-1,s,t);
                }else{
                    for(int k=i;k>=0;k--){
                        
                    }
                }
            }
            bool isMatch(string s, string p) {
                int n = s.size(), p = p.size();
                return pre(n-1,m-1,s,p);
            }
        };

    // brute 0 index based
        
    // memo
    // tab
    // optimize 
/* Best Time to Buy and Sell Stock 
    1. don't know the intution */
    // brute
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size(), mini = prices[0];
                int maxi = 0;
                for(int i=1;i<n;i++){
                    int cost = prices[i] - mini;
                    if(maxi < cost){
                        maxi = cost;
                    }
                    mini = min(mini,prices[i]);
                    // cout<<cost<<" "<<mini<<endl;
                }
                return maxi;
            }
        };

/* Best Time to Buy and Sell Stock II 
    1. don't remember the intuition 
    2. in recursion here we start from 0 -> n
    3. ind -1 => ind + 1 , in recursion 
    4. output of tab was wrong
        for(int ind=n-2;ind>=0;ind--) => for(int ind=n-1;ind>=0;ind--) */
    // brute : how much wrong i was
        class Solution {
        public:
            int pre(int ind,int n,int sync,vector<int>& prices){
                if(ind == n) return 0;
                int dtake = 0,take = 0;
                if(sync == 0) dtake = -prices[ind] + pre(ind-1,n,1,prices);
                else take = prices[ind] + pre(ind-1,n,0,prices);
                return max(take,dtake);
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                return pre(0,n-1,0,prices);
            }
        };

        class Solution {
        public:
            int pre(int ind,int buy,int n,vector<int>& prices){
                if(ind == n) return 0;
                
                int profit = 0;
                if(buy == 0) 
                    profit = max(-prices[ind] + pre(ind+1,1,n,prices),pre(ind+1,0,n,prices));
                else 
                    profit = max(prices[ind] + pre(ind+1,0,n,prices),pre(ind+1,1,n,prices));
                
                return profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                return pre(0,0,n,prices);
            }
        };
        
    // memo
        class Solution {
        public:
            int pre(int ind,int buy,int n,vector<int>& prices,vector<vector<int>> &dp){
                if(ind == n) return 0;
                if(dp[ind][buy] != -1) return dp[ind][buy];
                
                int profit = 0;
                if(buy == 0) 
                    profit = max(-prices[ind] + pre(ind+1,1,n,prices,dp),pre(ind+1,0,n,prices,dp));
                else 
                    profit = max(prices[ind] + pre(ind+1,0,n,prices,dp),pre(ind+1,1,n,prices,dp));
                
                return dp[ind][buy] = profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(n+1,vector<int> (2,-1));
                return pre(0,0,n,prices,dp);
            }
        };

    // tab
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(n+1,vector<int> (2,0));
                
                for(int ind=n-1;ind>=0;ind--){ ⭐
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy == 0) 
                            profit = max(-prices[ind] + dp[ind+1][1],dp[ind+1][0]);
                        else 
                            profit = max(prices[ind] + dp[ind+1][0],dp[ind+1][1]);
                        dp[ind][buy] = profit;
                    }
                }
                
                return dp[0][0];
            }
        };
        
    // optmize 2d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<int> dp(2,0),curr(2,0);
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy == 0) 
                            profit = max(-prices[ind] + dp[1],dp[0]);
                        else 
                            profit = max(prices[ind] + dp[0],dp[1]);
                        curr[buy] = profit;
                    }
                    dp = curr;
                }
                
                return dp[0];
            }
        };
    
    // optmize 1d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<int> dp(2,0);
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy == 0) 
                            profit = max(-prices[ind] + dp[1],dp[0]);
                        else 
                            profit = max(prices[ind] + dp[0],dp[1]);
                        dp[buy] = profit;
                    }
                }
                
                return dp[0];
            }
        };

/* Best Time to Buy and Sell Stock III 
    1. wrong memo answer b/c take only two transition not 4 only on else part
    2. dp of three will be made 
    3. dp size wrong declare in tab
        dp[n+1][2][3] => dp[n+1][2][4] 
    4. trans = 0 => trans = 1 */
    // brute
        class Solution {
        public:
            int pre(int ind,int buy,int t,int n,vector<int>& prices){
                if(ind == n or t == 0) return 0;
                
                int profit = 0;
                if(buy) profit = max(-prices[ind] + pre(ind+1,0,t-1,n,prices), pre(ind+1,1,t,n,prices));
                else profit = max(prices[ind] + pre(ind+1,1,t-1,n,prices), pre(ind+1,0,t,n,prices));
                
                return profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                
                return pre(0,1,4,n,prices);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int buy,int t,int n,vector<int>& prices,vector<vector<vector<int>>> &dp){
                if(ind == n or t == 0) return 0;
                if(dp[ind][buy][t] != -1) return dp[ind][buy][t];

                int profit = 0;
                if(buy) profit = max(-prices[ind] + pre(ind+1,0,t,n,prices,dp), pre(ind+1,1,t,n,prices,dp));
                else profit = max(prices[ind] + pre(ind+1,1,t-1,n,prices,dp), pre(ind+1,0,t,n,prices,dp)); // ⭐

                return dp[ind][buy][t] = profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<vector<int>>> dp(n+1,vector<vector<int>> (2,vector<int> (4,-1)));

                return pre(0,1,2,n,prices,dp); // ⭐
            } 
        };

    // tab
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<vector<int>>> dp(n+1,vector<vector<int>> (2,vector<int> (4,0))); // ⭐ 
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=1;buy>=0;buy--){
                        for(int trans=1;trans<=2;trans++){
                            int profit = 0;
                            if(buy == 0)
                                profit = max(-prices[ind] + dp[ind+1][1][trans], dp[ind+1][0][trans]);
                            else // 1
                                profit = max(prices[ind] + dp[ind+1][0][trans-1], dp[ind+1][1][trans]);
                            dp[ind][buy][trans] = profit;
                        }
                    }
                }
                
                return dp[0][0][2];
            }
        };
    // optimize 2d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(2,vector<int> (4,0)),curr(2,vector<int> (4,0));
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=1;buy>=0;buy--){
                        for(int trans=1;trans<=2;trans++){
                            int profit = 0;
                            if(buy == 0)
                                profit = max(-prices[ind] + dp[1][trans], dp[0][trans]);
                            else // 1
                                profit = max(prices[ind] + dp[0][trans-1], dp[1][trans]);
                            curr[buy][trans] = profit;
                        }
                    }
                    dp = curr;
                }
                
                return dp[0][2];
            }
        };
    
    // optimize 1d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(2,vector<int> (4,0));
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=1;buy>=0;buy--){
                        for(int trans=1;trans<=2;trans++){
                            int profit = 0;
                            if(buy == 0)
                                profit = max(-prices[ind] + dp[1][trans], dp[0][trans]);
                            else // 1
                                profit = max(prices[ind] + dp[0][trans-1], dp[1][trans]);
                            dp[buy][trans] = profit;
                        }
                    }
                }
                
                return dp[0][2];
            }
        };

/*  Best Time to Buy and Sell Stock IV 
    1. i was taking k/2 trans => k tans in recursion 
    2. trans will start from 1
        for(int trans=0;trans<=k;trans++) => for(int trans=1;trans<=k;trans++) */
    // brute
        class Solution {
        public:
            int pre(int ind,int buy,int trans,vector<int>& prices){
                if(ind == prices.size() or trans == 0) return 0;

                int profit = 0;
                if(buy)
                    profit = max(-prices[ind] + pre(ind+1,0,trans,prices), pre(ind+1,1,trans,prices));
                else 
                    profit = max(prices[ind] + pre(ind+1,1,trans-1,prices), pre(ind+1,0,trans,prices));
                
                return profit;
            }
            int maxProfit(int k, vector<int>& prices) {
                int n = prices.size();
                return pre(0,1,k,prices); // ⭐
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int buy,int trans,vector<int>& prices,vector<vector<vector<int>>>& dp){
                if(ind == prices.size() or trans == 0) return 0;
                if(dp[ind][buy][trans] != -1) return dp[ind][buy][trans];
                
                int profit = 0;
                if(buy)
                    profit = max(-prices[ind] + pre(ind+1,0,trans,prices,dp), pre(ind+1,1,trans,prices,dp));
                else 
                    profit = max(prices[ind] + pre(ind+1,1,trans-1,prices,dp), pre(ind+1,0,trans,prices,dp));
                
                return dp[ind][buy][trans] = profit;
            }
            int maxProfit(int k, vector<int>& prices) {
                int n = prices.size();
                vector<vector<vector<int>>> dp(n+1,vector<vector<int>> (2+2,vector<int> (k+2,-1)));
                return pre(0,1,k,prices,dp);
            }
        };
    
    // tab
        class Solution {
        public:
            int maxProfit(int k, vector<int>& prices) {
                int n = prices.size();
                vector<vector<vector<int>>> dp(n+2,vector<vector<int>> (2+2,vector<int> (k+2,0)));
                
                for(int ind = n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        for(int trans=1;trans<=k;trans++){ // ⭐  
                            int profit = 0;
                            if(buy)
                                profit = max(-prices[ind] + dp[ind+1][0][trans], dp[ind+1][1][trans]);
                            else 
                                profit = max(prices[ind] + dp[ind+1][1][trans-1], dp[ind+1][0][trans]);
                
                            dp[ind][buy][trans] = profit;
                        }
                    }
                }
                
                return dp[0][1][k];
            }
        };
    
    // optimize 2d array
        class Solution {
        public:
            int maxProfit(int k, vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(2+2,vector<int> (k+2,0)),curr(2+2,vector<int> (k+2,0));
                
                for(int ind = n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        for(int trans=1;trans<=k;trans++){
                            int profit = 0;
                            if(buy) profit = max(-prices[ind] + dp[0][trans], dp[1][trans]);
                            else profit = max(prices[ind] + dp[1][trans-1], dp[0][trans]);
                            curr[buy][trans] = profit;
                        }
                    }
                    dp = curr;
                }
                
                return dp[1][k];
            }
        };

    // optimize 1d array
        class Solution {
        public:
            int maxProfit(int k, vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(2+2,vector<int> (k+2,0));
                
                for(int ind = n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        for(int trans=1;trans<=k;trans++){
                            int profit = 0;
                            if(buy) profit = max(-prices[ind] + dp[0][trans], dp[1][trans]);
                            else profit = max(prices[ind] + dp[1][trans-1], dp[0][trans]);
                            dp[buy][trans] = profit;
                        }
                    }
                }
                
                return dp[1][k];
            }
        };

/* Best Time to Buy and Sell Stock with Cooldown */
    // brute
        class Solution {
        public:
            int pre(int ind,int buy,vector<int>& prices){
                if(ind >= prices.size()) return 0;
                int profit = 0;
                if(buy)
                    profit = max(-prices[ind] + pre(ind+1,0,prices), pre(ind+1,1,prices));
                else 
                    profit = max(prices[ind] + pre(ind+2,1,prices), pre(ind+1,0,prices));
                return profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                return pre(0,1,prices);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int buy,vector<int>& prices,vector<vector<int>>& dp){
                if(ind >= prices.size()) return 0;
                if(dp[ind][buy] != -1) return dp[ind][buy];
                
                int profit = 0;
                if(buy)
                    profit = max(-prices[ind] + pre(ind+1,0,prices,dp), pre(ind+1,1,prices,dp));
                else 
                    profit = max(prices[ind] + pre(ind+2,1,prices,dp), pre(ind+1,0,prices,dp));
                return dp[ind][buy] = profit;
            }
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(n+2,vector<int> (2+2,-1));
                return pre(0,1,prices,dp);
            }
        };

    // tab
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<vector<int>> dp(n+2,vector<int> (2+2,0));
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy)
                            profit = max(-prices[ind] + dp[ind+1][0], dp[ind+1][1]);
                        else 
                            profit = max(prices[ind] + dp[ind+2][1], dp[ind+1][0]);
                        dp[ind][buy] = profit; 
                    }
                }
                
                return dp[0][1];
            }
        };

    // optimize
        class Solution {
        public:
            int maxProfit(vector<int>& prices) {
                int n = prices.size();
                vector<int> dp(4,0),curr(4,0),dp1(4,0);
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy)
                            profit = max(-prices[ind] + dp[0], dp[1]);
                        else 
                            profit = max(prices[ind] + dp1[1], dp[0]);
                        curr[buy] = profit; 
                    }
                    dp1 = dp;
                    dp = curr;
                }
                
                return dp[1];
            }
        };

/* Best Time to Buy and Sell Stock with Transaction Fee */
    // brute
        class Solution {
        public:
            int pre(int ind,int buy,int fee,vector<int>& prices){
                if(ind == prices.size()) return 0;
                int profit = 0;
                if(buy) 
                    profit = max(-prices[ind] + pre(ind+1,0,fee,prices),pre(ind+1,1,fee,prices));
                else 
                    profit = max(prices[ind] - fee + pre(ind+1,1,fee,prices),pre(ind+1,0,fee,prices));
                return profit;
            }
            int maxProfit(vector<int>& prices, int fee) {
                int n = prices.size();
                return pre(0,1,fee,prices);
            }
        };

    // memo
        class Solution {
        public:
            int pre(int ind,int buy,int fee,vector<int>& prices,vector<vector<int>>& dp){
                if(ind == prices.size()) return 0;
                if(dp[ind][buy] != -1) return dp[ind][buy];
                
                int profit = 0;
                if(buy) 
                    profit = max(-prices[ind] + pre(ind+1,0,fee,prices,dp),pre(ind+1,1,fee,prices,dp));
                else 
                    profit = max(prices[ind] - fee + pre(ind+1,1,fee,prices,dp),pre(ind+1,0,fee,prices,dp));
                
                return dp[ind][buy] = profit;
            }
            int maxProfit(vector<int>& prices, int fee) {
                int n = prices.size();
                
                vector<vector<int>> dp(n+2,vector<int> (2,-1));
                return pre(0,1,fee,prices,dp);
            }
        };
    // tab
        class Solution {
        public:
            int maxProfit(vector<int>& prices, int fee) {
                int n = prices.size();
                
                vector<vector<int>> dp(n+2,vector<int> (2,0));
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy) 
                            profit = max(-prices[ind] + dp[ind+1][0],dp[ind+1][1]);
                        else 
                            profit = max(prices[ind] - fee + dp[ind+1][1], dp[ind+1][0]);
                        dp[ind][buy] = profit;
                    }
                }
                
                return dp[0][1];
            }
        };
        
    // optimize 2d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices, int fee) {
                int n = prices.size();
                vector<int> dp(2,0),curr(2,0);
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy) 
                            profit = max(-prices[ind] + dp[0],dp[1]);
                        else 
                            profit = max(prices[ind] - fee + dp[1], dp[0]);
                        curr[buy] = profit;
                    }
                    dp = curr;
                }
                
                return dp[1];
            }
        };

    // optimize 1d array
        class Solution {
        public:
            int maxProfit(vector<int>& prices, int fee) {
                int n = prices.size();
                vector<int> dp(2,0);
                
                for(int ind=n-1;ind>=0;ind--){
                    for(int buy=0;buy<=1;buy++){
                        int profit = 0;
                        if(buy) 
                            profit = max(-prices[ind] + dp[0],dp[1]);
                        else 
                            profit = max(prices[ind] - fee + dp[1], dp[0]);
                        dp[buy] = profit;
                    }
                }
                
                return dp[1];
            }
        };

/* Longest Increasing Subsequence */
    // brute
        
    // memo
    // tab
    // optmize








/* Maximal Rectangle */

/* Count Square Submatrices with All Ones */

/*
    TODO: Steps by Knight
    ? https://practice.geeksforgeeks.org/problems/steps-by-knight5927/1
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
    public:
    bool isValid(int i,int j,int n,vector<vector<bool>> &visit){
        return ( (i>=0) and (j>=0) and (i<=n-1) and (j<=n-1) and (!visit[i][j]));
    }
	int minStepToReachTarget(vector<int>& kp,vector<int>& tp,int n) {
        kp[0]--,kp[1]--,tp[0]--,tp[1]--;
        
        int steps = 1e9;
        queue<pair<pair<int,int>,int>> q;
        vector<vector<bool>> visit(n,vector<bool> (n,0));
        
        if(kp == tp) return 0;
        
        q.push({{kp[0],kp[1]},0});
        while(!q.empty()){
            int i = q.front().first.first, j = q.front().first.second, step = q.front().second;
            visit[i][j] = true;
            q.pop();
            
            int dx[]={1,1,-1,-1,2,2,-2,-2};
            int dy[]={2,-2,2,-2,1,-1,1,-1};
            
            for(int _=0;_ < 8;_++){
                int x = dx[_] + i;
                int y = dy[_] + j;
                // cout<<x<<" "<<y<<endl;
                if(x == tp[0] and y == tp[1]) steps = min(steps,step + 1);
                if(isValid(x,y,n,visit)){
                    visit[x][y] = true;
                    // cout<<x<<" "<<y<<endl;
                    q.push({{x,y},step+1});
                }
            }
            // cout<<"queue shift take place"<<endl;
        }
        
        return steps;
	}
};
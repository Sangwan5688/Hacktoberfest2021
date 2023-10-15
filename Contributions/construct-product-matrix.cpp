#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> constructProductMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>>ans(n,vector<int>(m));
        vector<vector<int>>xx(n,vector<int>(m));
        vector<vector<int>>yy(n,vector<int>(m));



        int mod = 12345;
        long long p = 1;

        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                xx[i][j] = p;
                p *= grid[i][j];
                p %= mod;
            }
        }
        p = 1;
        for(int i=n-1; i>=0; i--){
            for(int j=m-1; j>=0; j--){
                yy[i][j] = p;
                p *= grid[i][j];
                p %= mod;
            }
        }


        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                long long mul = xx[i][j] * yy[i][j];

                ans[i][j] = mul%mod;
            }
        }
        return ans;
    }
};

int main(){
    int n,m;
    cin>>n>>m;
    vector<vector<int>>grid(n,vector<int>(m,0));
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cin>>grid[i][j];
        }
    }
    vector<vector<int>> ans=constructProductMatrix(grid);
    return 0;

}

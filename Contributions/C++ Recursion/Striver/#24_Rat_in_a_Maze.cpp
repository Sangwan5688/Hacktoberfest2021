/*
    * Rat in a Maze
    ? https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1
*/
class Solution{
    public:
    vector<string> findPath(vector<vector<int>> &m, int n) {
        vector<string> ans;
        vector<vector<int>> vis(n,vector<int> (n,0));
        vector<int> di = {1,0,0,-1},dj = {0,-1,1,0};
        
        if(m[0][0] == 1) solve(0,0,m,n,ans,"",vis,di,dj);
        return ans;
    }
    void solve(int i,int j,vector<vector<int>> &a,int n,vector<string> &ans
        ,string move,vector<vector<int>>& vis,vector<int> &di,vector<int> &dj){
        if(i == n - 1 and j == n - 1){
            ans.push_back(move);
            return;
        }
        string dir = "DLRU";
        for(int ind=0;ind<4;ind++){
            int nexti = i + di[ind];
            int nextj = j + dj[ind];
            if(nexti >= 0 and nextj >= 0 and nexti < n and nextj < n 
                and !vis[nexti][nextj] and a[nexti][nextj] == 1){
                vis[i][j] = 1;
                solve(nexti,nextj,a,n,ans,move+dir[ind],vis,di,dj);
                vis[i][j] = 0;
            }
        }
    }
};

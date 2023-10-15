/*
    * M-Coloring Problem
    ? https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1
*/
class Solution{
    public:
    bool isSafe(int node,vector<int>& color,bool graph[101][101],int n,int col){
        for(int k=0;k<n;k++){
            if(k!=node and graph[k][node] == 1 and color[k] == col)
            return false;
        }
        return true;
    }
    bool solve(int node,vector<int>& color,int m,int n,bool graph[101][101]){
        if(node == n) return true;
        for(int i=1;i<=m;i++){
            if(isSafe(node,color,graph,n,i)){
                color[node] = i;
                if(solve(node+1,color,m,n,graph)) return true;
                color[node] = 0;
            }
        }
        return false;
    }
    bool graphColoring(bool graph[101][101], int m, int n) {
        vector<int> color(n,0);
        if(solve(0,color,m,n,graph)) return true;
        else return false;
    }
};
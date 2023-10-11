#include<bits/stdc++.h>
using namespace std;


void dfs(vector<vector<int>>graph,vector<vector<int>>visited,int i,int j){
    if(visited[i][j]==1 || i<0 || j<0 || i>=graph.size() || j>=graph[0].size() ||graph[i][j]==1){
        return;
    }
    visited[i][j]=1;
    
    dfs(graph,visited,i-1,j);
     dfs(graph,visited,i,j+1); 
     dfs(graph,visited,i+1,j);
      dfs(graph,visited,i,j-1);
}

int main(){
    int n,m;
    cin>>n>>m;
    vector<vector<int>>graph;
    vector<vector<int>>visited(n,vector<int>(m,0));
  //memset(visited,0,sizeof(visited));
     for(int i=0;i<n;i++){
        vector<int>a;
        for(int j=0;j<m;j++){
            int input;
            cin>>input;
            a.push_back(input);
        }
        graph.push_back(a);
    }
    int count=0;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(visited[i][j]==0 && graph[i][j]==0){
                dfs(graph ,visited,i,j);
                count++;
            }
            
        }
    }
    cout<<count;
    return 0;
}
// 8
// 8
// 0 0 1 1 1 1 1 1
// 0 0 1 1 1 1 1 1
// 1 1 1 1 1 1 1 0
// 1 1 0 0 0 1 1 0
// 1 1 1 1 0 1 1 0
// 1 1 1 1 0 1 1 0
// 1 1 1 1 1 1 1 0
// 1 1 1 1 1 1 1 0

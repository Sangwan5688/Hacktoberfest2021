#include<bits/stdc++.h>
using namespace std;

vector<pair<int,int>>graph[100005];


void dfs(unordered_set<int>visited,int src,int node_size,string psf,int osrc){
    if(visited.size()==node_size-1){
        cout<<psf;
        
        bool last_char=false;
        for(auto y: graph[src]){
            if(y.first==osrc){
                last_char=true;
            }
        }
        if(last_char)
        cout<<"*";
        else
        cout<<".";
        cout<<endl;
        
    }
    visited.insert(src);
    for(auto x : graph[src]){
        if(visited.find(x.first)==visited.end()){
            dfs(visited,x.first,node_size,psf+to_string(x.first),osrc);
        }
    }
    visited.erase(src);
}



int main(){
    int n,m;
    cin>>n>>m;
    
    for(int i=0;i<m;i++){
        int x,y,z;
        cin>>x>>y>>z;
        graph[x].push_back(make_pair(y,z));
        graph[y].push_back(make_pair(x,z));
        
    }
    int src;
    cin>>src;
    string psf;
    unordered_set<int>visited;
    dfs(visited,src,n,psf+to_string(src)+"",src);

    return 0;
}


// 7
// 9
// 0 1 10
// 1 2 10
// 2 3 10
// 0 3 10
// 3 4 10
// 4 5 10
// 5 6 10
// 4 6 10
// 2 5 10
// 0

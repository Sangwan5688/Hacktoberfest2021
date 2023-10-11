#include <bits/stdc++.h>
using namespace std;


vector<int> adj[1001];
vector<pair<int,vector<int>>> pt;

void dfs(int start,int end,int vis[],vector<int> rs,int w){
   rs.push_back(start);
   if(start == end){
       pt.push_back({w*(rs.size()-1),rs});
       return;
   }
   for(auto it : adj[start]){
       if(vis[it] == 0){
          vis[start] = 1;
          dfs(it,end,vis,rs,w);
          vis[start] = 0;
       }
   }
}

int32_t main()
{
    int N,M,T,C;
    cin>>N>>M>>T>>C;
    int u,v;
    while(M--){
        cin>>u>>v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    vector<int> rs;
    int w = C;
    int vis[N+1] = {0};
    dfs(1,N,vis,rs,w);
    sort(pt.begin(),pt.end());
    vector<int> rt[N+1];
    for(int i=0;i<pt.size();i++){
        int nes = pt[i].second.size();
        for(auto u : pt[i].second){
            rt[u].push_back(nes);
        }
    }
    int trt[N+1] = {0};
    trt[1] = 1;
    trt[N] = 1;
    for(int i=2;i<=N-1;i++){
        if(rt[i].size() > 0){
            int tm = rt[i][0];
            int up = upper_bound(rt[i].begin(),rt[i].end(),tm) - rt[i].begin();
            trt[i] = up;
        }
    }
    for(int i=1;i<=N;i++)
    cout<<trt[i]<<" ";
    return 0;
}
#include <bits/stdc++.h>
using namespace std;

#define ll long long
vector<int> adj[400001];
int vis[400001];
int par[400001];
int in[400001];
int out[400001];
int timer = 0;
void dfs(int v,int p)
{
    vis[v]=1;
    par[v]=p;

    in[v]=timer++;

    for(auto child:adj[v])
    {
        if(vis[child]==0)
        {
            dfs(child,v);
        }
    }

    out[v]=timer++;
}

bool isancestor(int a,int b)
{
    return in[a]<in[b]&&out[a]>out[b];
}

void solve()
{
    int n,q;
    cin>>n>>q;
    timer=0;

    for(int i=1;i<=n;i++)
    {
        adj[i].clear();
        vis[i]=0;

    }
    for(int i=2;i<=n;i++)
    {
        int x;
        cin>>x;
        adj[x].push_back(i);
    }

    dfs(1,-1);

    vector<vector<int>>LCA(n+1,vector<int>(32,-1));

    for(int i=1;i<=n;i++)
    {
        LCA[i][0]=par[i];
    }


    for(int j=1;j<32;j++)
    {
        for(int i=1;i<=n;i++)
        {
            int u=LCA[i][j-1];
            if(u!=-1)
            {
                LCA[i][j]=LCA[u][j-1];
            }
        }
    }

    while(q--)
    {
        int a,b;
        cin>>a>>b;
        if(a==b)
        {
            cout<<a<<endl;
            continue;
        }

        else if(isancestor(a,b))
        {
            cout<<a<<endl;
        }
        else if(isancestor(b,a))
        {
            cout<<b<<endl;
        }
        else
        {
            for(int i=31;i>=0;i--)
            {
                int parent=LCA[a][i];
                if(parent!=-1&&!isancestor(parent,b))
                {
                    a=LCA[a][i];
                }
            }
            cout<<LCA[a][0]<<endl;
        }
    }

}

int main()
{

    ios_base::sync_with_stdio(0);
    cin.tie(0);

#ifndef ONLINE_JUDGE
    freopen("Error.txt", "w", stderr);
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
#endif

    int T;
    // cin >> T;
    T=1;
    while (T--)
    {
        solve();
    }
}
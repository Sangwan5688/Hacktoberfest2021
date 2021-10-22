
// if it is possible to divide the vertices of a graph into 2 mutually exclusive & exhaustive sets such that all edges are across sets
//  every non cyclic graph is bipartite and if it contains the cycle then the length of the cycle should be even
//   if the length of the cycle is odd then the graph is not bipartite
//  apply bfs and check the level if the level will be same for the even cycle so it is bi partite.
//  bfs remove mark* work add*

#include <bits/stdc++.h>
using namespace std;
vector<pair<int, int>> graph[100];


bool bfs(int src,int visited[])
{
    queue<pair<int, int>> q;
    q.push(make_pair(src, 0));

    while (!q.empty()) 
    {
        auto current = q.front();
        q.pop();
        if (visited[current.first] != -1)
        {
            if (current.second != visited[current.first])
            {
                return false;
            }
        }
        else{
            visited[current.first] = current.second;
        }
        for (auto x : graph[current.first])
        {
            if (visited[x.first] == -1)
            {
                q.push(make_pair(x.first, (current.second + 1)));
            }
        }
        
 
    }
    return true;
}

int main()
{
    

    int n, m;
    cin >> n >> m;
    int visited[100];
    memset(visited,-1,sizeof(visited));
    for (int i = 0; i < m; i++)
    {
        int x, y, z;
        cin >> x >> y >> z;
        graph[x].push_back(make_pair(y, z));
        graph[y].push_back(make_pair(x, z));
    }

    for (int i = 0; i < n; i++)
    {
        if (visited[i] == -1)
        {
            bool x = bfs(i,visited);
            if (x == false)
            {
                cout << "false";
                return 0;
            }
        }
    }
    cout << "true";

    return 0;
}

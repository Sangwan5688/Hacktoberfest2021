/*
    TODO: Graph Representation
    ? 
*/
#include "bits/stdc++.h"
using namespace std;

#define int        long long int
#define now(x)     cout<<#x<<" : "<<x<<endl;

void solve1(){
    // solve2 matrix
    int n,m;
    cin>>n>>m;
    int adj[n+1][m+1]; // O(E*E)
    while(m--){
        int u,v;
        cin>>u>>v;
        adj[u][v] = 1;
        adj[v][u] = 1;
    }
}

void solve2(){
    // adjacent list for undirected graph
    int n,m;
    cin>>n>>m;
    vector<int> adj[n+1]; // O(2*E)
    while(m--){
        int u,v;
        cin>>u>>v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
}

void solve3(){
    // adjacent list for directed graph
    int n,m;
    cin>>n>>m;
    vector<int> adj[n+1]; // O(E)
    while(m--){
        int u,v;
        cin>>u>>v;
        adj[u].push_back(v);
    }
}

void solve4(){
    // adjacent matrix for weighted graph
    int n,m;
    cin>>n>>m;
    int w[n+1][m+1]; // O(E*E)
    while(m--){
        int u,v,weight;
        cin>>u>>v>>weight;
        w[u][v] = weight;
        w[v][u] = weight;
    }
}

void solve5(){
    // adjacent matrix for weighted graph
    int n,m;
    cin>>n>>m;
    vector<pair<int,int>> w[n+1];
    // u (v,w)
    while(m--){
        int u,v,weight;
        cin>>u>>v>>weight;
        w[u].push_back({v, weight});
        w[v].push_back({u, weight});
    }
}


void solve() {
    // undirected graph
    int n,m;
    cin>>n>>m;

    unordered_map<int,vector<int>> adj;
    while(m--){
        int a,b;
        cin>>a>>b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
}

void solve_1() {
    // undirected graph
    int n,m;
    cin>>n>>m;

    unordered_map<int,vector<pair<int,int>>> w;
    while(m--){
        int a,b,weight;
        cin>>a>>b>>weight;
        w[a].push_back({b,weight});
        w[b].push_back({a,weight});
    }
}

signed main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL);
    int t = 1;
    // cin >> t;
    while (t--) solve();
    return 0;
}


/*
    * java code
*/
import java.util.ArrayList;
import java.util.Scanner;

public class graph_representation {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();

        ArrayList<ArrayList<Integer>> adj = new ArrayList<ArrayList<Integer>>();

        for(int i=0;i<=n;i++) adj.add(new ArrayList<Integer>());

        while(m > 0){
            int u = sc.nextInt();
            int v = sc.nextInt();
            adj.get(u).add(v);
            adj.get(v).add(u);
            m--;
        }

        for(int i=1;i<=n;i++){
            System.out.println(i + " : ");
            for(int j=0;j<adj.get(i).size();j++){
                System.out.println(adj.get(i).get(j) + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}

class Pair {
    Integer v,w;    
}

class graph_representation_weighted {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();

        ArrayList<ArrayList<Pair>> adj = new ArrayList<ArrayList<Pair>>();

        for(int i=0;i<=n;i++) adj.add(new ArrayList<Pair>());

        while(m > 0){
            int u = sc.nextInt();
            int v = sc.nextInt();
            int w = sc.nextInt();

            Pair temp1 = new Pair();
            temp1.v = v;
            temp1.w = w;
            adj.get(u).add(temp1);
            Pair temp2 = new Pair();
            temp2.v = u;
            temp2.w = w;
            adj.get(v).add(temp2);
            m--;
        }

        for(int i=1;i<=n;i++){
            System.out.println(i + " : ");
            for(int j=0;j<adj.get(i).size();j++){
                System.out.println(adj.get(i).get(j) + " ");
            }
            System.out.println();
        }
        sc.close();
    }
}
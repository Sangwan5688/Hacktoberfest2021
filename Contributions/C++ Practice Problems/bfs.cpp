#include<iostream>
#include<list>
#include<queue>
#include<climits>
using namespace std;

class Graph{
		int V;
		list<int> *adj;
	public:
		Graph(int V){
			this->V=V;
			adj=new list<int>[V];
		}
		void addEdge(int a,int b){
			adj[a].push_back(b);
		}
		void BFS(int s){
			int d[V];
			for(int i=0;i<V;i++){
				d[i]= INT_MAX;
			}
			d[s]=0;
			queue<int> q;
			q.push(s);
			while(!q.empty()){
				int u=q.front();
				q.pop();
				cout << u << "  ";
				for(list<int>::iterator it=adj[u].begin();it!=adj[u].end();it++){
					if(d[*it]==INT_MAX){
						d[*it]=d[u]+1;
						q.push(*it);
					}
				}
			}
			cout << endl;
		}
};
int main(){
	int V;
	cout<<"Enter no. of vertices:";
	cin>>V;
	Graph g(V);
	int n;
	cout<<"Enter no. of edges:";
	cin>>n;
	cout<<"Enter pairs of vertices of edges:";
	int a,b;
	while(n--){
		cin>>a>>b;
		g.addEdge(a,b);
	}
	int s;
	cout<<"Enter source vertex:";
	cin>>s;
	cout<<"Breadth First traversal:";
	g.BFS(s);
	return 0;
}

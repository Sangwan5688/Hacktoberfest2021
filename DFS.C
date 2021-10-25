// PRACTICAL 2 - To study and implement Depth First Search algorithm in C
#include<stdio.h>
#include<stdlib.h>
typedef struct listnode
{
 int info;
 struct listnode* link;
}
listnode;
typedef struct list
{
 listnode *head;
}
list;
typedef struct graph
{
 int vertices;
 list* array;
}
graph;
int visited[1000];
// creation of graph
graph* creategraph(int n)
{
 int i;
 graph* G=(graph *)(malloc(sizeof(graph)));
 G->vertices = n;

 G->array = (list *)malloc(n * sizeof(struct list));

 for(i=0; i<n; i++)
 G->array[i].head = NULL;
 return G;
}
//creating edge
void addedge(graph* G, int src, int dest)
{
 listnode* newnode;
 newnode=(listnode *)(malloc(sizeof(listnode)));
 newnode->info=dest;
 newnode->link=G->array[src].head;
 G->array[src].head=newnode;
}
//traversal of the graph
void traverse(graph* G, int n)
{
 graph* temp=G;
 int i;
 list* temp_list;
 listnode* temp_node;
 for(i=0; i<n; i++)
 {
 temp_node=temp->array[i].head;
 while(temp_node!=NULL)
 {
 printf("%d -> %d\t", i, temp_node->info);
 temp_node=temp_node->link;
 }
 printf("\n");
 }
 return;
}
void dfs(graph* G, int v)
{
 int i, j;
 printf("%d ", v);
 visited[v]=1;
 listnode* temp_node=G->array[v].head;
 while(temp_node!=NULL)
 {
 if(!visited[temp_node->info])
 {

 // DFS traversal
 printf("\tMoving from %d to %d", v, temp_node->info);
 printf("\n");
 dfs(G,temp_node->info);
 }

 temp_node=temp_node->link;
 }
 return;
}
//main function
int main()
{
 int n, i, j, k, temp, m, a, b;
 printf("Enter the number of vertices : ");
 scanf("%d", &n);
 printf("Enter the number of edges : ");
 scanf("%d", &m);
 printf("Enter the edges : ");
 printf("\n");
 int ini=n+1;
 graph* G=creategraph(n+1);
 for(i=0; i<m; i++)
 {
 scanf("%d", &a);
 scanf("%d", &b);
 addedge(G,a,b);
 if(a<ini)
 ini=a;
 }
 //adjacency list
 printf("Traversing the adjacency list : ");
 printf("\n");
 traverse(G,n);
 printf("\n");
 printf("DFS traversal starting with %d : ", ini);
 printf("\n");
 dfs(G,ini);
 printf("\n");
 return 0;
}

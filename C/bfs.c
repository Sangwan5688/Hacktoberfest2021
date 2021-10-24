// PRACTICAL 1 - To study and implement Breadth First Search algorithm in C using queue
#include <stdio.h>
#include <stdlib.h>
struct node{
 int v;
 int visited;
 int level;
 struct node *next;
};
struct Graph{
 int V;
 int E;
 struct node **adjList;
};
struct queue{
 struct node *front;
 struct node *rear;
};
// Insertion of element in queue
void insertQ(struct queue *q,int v){
 if(!q->front && !q->rear){
 q->front = (struct node*)malloc(sizeof(struct node));
 q->front->v = v;
 q->front->next = NULL;
 q->rear = q->front;
 }
 else if(q->front == q->rear){
 q->rear = (struct node*)malloc(sizeof(struct node));
 q->rear->v = v;
 q->rear->next = NULL;
 q->front->next = q->rear;
 }
 else{
 struct node *temp = (struct node*)malloc(sizeof(struct node));
 temp->v = v;
 q->rear->next = temp;
 q->rear = temp;
 q->rear->next = NULL;
 }
}
int dQ(struct queue *q){
 int v;
 v = q->front->v;
 struct node *temp = q->front;
 q->front = q->front->next;
 if(!q->front)
 q->rear = NULL;
 free(temp);
 return v;
}
// Creation of graph with input of number of edges and vertices
struct Graph *createGraph(){
 int V,E;
 printf("Enter the number of Nodes in the Graph\n");
 scanf("%d",&V);
 printf("Enter the number of Edges in the Graph\n");
 scanf("%d",&E);
 struct Graph *G = (struct Graph*)malloc(sizeof(struct Graph));
 G->V = V;
 G->E = E;
 G->adjList = (struct node**)malloc(sizeof(struct node*)*V);
 int i;
 for(i=0;i<V;i++){
 G->adjList[i] = (struct node*)malloc(sizeof(struct node));
 G->adjList[i]->v = i;
 G->adjList[i]->visited = G->adjList[i]->level = 0;
 G->adjList[i]->next = NULL;
 }
 printf("\nNote - Node numbers should start with 0\n\n");
 for(i=0;i<E;i++){
 int u,v;
 printf("Enter the nodes of the Edge %d\n",i+1);
 scanf("%d%d",&u,&v);
 struct node *temp = (struct node*)malloc(sizeof(struct node));
 temp->v = v;
 temp->next = G->adjList[u]->next;
 G->adjList[u]->next = temp;
 temp = (struct node*)malloc(sizeof(struct node));
 temp->v = u;
 temp->next = G->adjList[v]->next;
 G->adjList[v]->next = temp;
 }
 return G;
}
//Traversal of Breadth First Graph
void BFS(struct Graph *G,struct queue *q,int level){
 while(q->front){
 while(q->front && (G->adjList[q->front->v]->level == level)){
 int v = dQ(q);
 printf("%d ",v);
 struct node *head = G->adjList[v]->next;
 while(head){
 if(G->adjList[head->v]->visited){
 head = head->next;
 continue;
 }
 G->adjList[head->v]->level = level + 1;
 G->adjList[head->v]->visited = 1;
 insertQ(q,head->v);
 head = head->next;
 }
 }
 level++;
 }
}
// Main function
int main(){
 struct Graph *G = createGraph();
 struct queue *Q = (struct queue*)malloc(sizeof(struct queue));
 Q->front = Q->rear = NULL;
 insertQ(Q,0);
 G->adjList[0]->visited = 1;
 G->adjList[Q->front->v]->level = 0;
 BFS(G,Q,0);
}

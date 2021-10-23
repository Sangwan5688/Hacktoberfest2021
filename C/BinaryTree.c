#include<stdio.h>
#include<stdlib.h>
struct node{
	int data;
	struct node *left;
	struct node *right; 
};
int main(){
	int n,i,item;
	struct node *p,*q,*root;
	printf("Enter the number of nodes:");
	scanf("%d",&n);
	for(i=0;i<n;i++){
		p=(struct node*)malloc(sizeof(struct node));
		printf("(%d). ",i+1);
		scanf("%d",&p->data);
		p->left=NULL;
		p->right=NULL;
		if(i==0){
			root=p;
		}else{
			q=root;
			while(1){
				if(p->data>q->data){
					if(q->right==NULL){
						q->right=p;
						break;
					}else{
						q=q->right;
					}

				}else{
					if(q->left==NULL){
						q->left=p;
						break;
					}else{
						q=q->left;
					}
				}
			}

		}
	}
	return 0;
}

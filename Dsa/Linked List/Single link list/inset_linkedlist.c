#include <stdio.h>
#include <stdlib.h>

struct node {
	int data;
	struct node *next;
}*start=NULL;

void createlist(int n){
	struct node *temp;
	struct node *new=(struct node *)malloc(sizeof(struct node ));
	new->data=n;
	new->next=NULL;
	if(start == NULL)
	start=new;
	else{
		temp=start;
		while(temp->next!=0)
		{
			temp=temp->next;
		}
		temp->next=new;
	}
}
void insert_position(int value,int pos){
	int c=0;
	struct node *t,* curr;
	curr=start;
	while(curr != NULL)
	{
		c++;
	if(c==pos-1)
	{
	t=(struct node *)malloc(sizeof(struct node));
	t->data=value;
	t->next=curr->next;
	curr->next=t;
	}
	curr=curr->next;
	}
}
void  traverse(){ 
struct node *temp;
temp=start;
while(temp!=NULL){
	printf("%d ",temp->data);
	temp=temp->next;
}
}

int main() {
	int num1,num2,num3;
	printf("Enter the numbers to create the list\n");
	scanf("%d%d%d",&num1,&num2,&num3);
	createlist(num1);
	createlist(num2);
	createlist(num3);
	traverse();
	int n,p;
	printf("\nEnter the position\n");
	scanf("%d",&p);
	printf("Enter the number to be inserted in the list\n");
	scanf("%d",&n);
	insert_position(n,p);
	printf("New list\n");
	traverse();
	return 0;
}

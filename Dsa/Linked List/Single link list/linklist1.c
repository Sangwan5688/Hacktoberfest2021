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
void  traverse(){ 
struct node *temp;
temp=start;
while(temp->next!=NULL){
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
	return 0;
}

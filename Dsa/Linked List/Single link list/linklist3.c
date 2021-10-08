#include <stdio.h>
#include <stdlib.h>
struct node{
	int data;
	struct node *next;
}*start=NULL;

void createlist(int n){
	struct node *temp;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=n;
	new->next=NULL;
	if(start==NULL)
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
void traverse(){
	struct node *temp;
	temp=start;
	while(temp!=NULL)
	{
   printf("%d\t",temp->data);
   temp=temp->next;
	}
}
int main() {
	int n,i;
	printf("Enter the number of elements to be inserted in the linklist\n");
	scanf("%d",&n);
	int a[n];
	printf("Enter the elements\n");
	for(i=0;i<n;i++)
	{
		scanf("%d",&a[i]);
	}
	for(i=0;i<n;i++)
	{
		createlist(a[i]);
	}
	traverse();
	return 0;
}

#include <stdio.h>
#include <stdlib.h>
struct node {
	int data;
	struct node *next;
}*start=NULL;
void createlist(int n)
{
	struct node *temp;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=n;
	new->next=NULL;
	if(start==NULL)
	start=new;
	else
	{
		temp=start;
		while(temp->next!=NULL)
		{
			temp=temp->next;
		}
		temp->next=new;
	}
}
void traverse()
{
	struct node *t;
	t=start;
	while(t!=NULL)
	{
		printf("%d\t",t->data);
		t=t->next;
	}
}
void reverse()
{
struct node *p=NULL;
struct node *t1=start;
struct node *t2;
while(t1!=NULL)
{
   t2=t1->next;
   t1->next=p;
   p=t1;
   t1=t2;	
}	
start=p;
}
int main() {
	int n;
	while(1)
	{
	printf("Enter the options for operations\n");
	printf("Option 1: Create a new node\n");
	printf("Option 2: Display the linked list\n");
	printf("Option 3: Reverse the linked list\n");
	printf("Option 4: Display the reversed link list\n");
	printf("Option 5: Exit\n");
	int i;
	printf("Enter the user choice\n");
	scanf("%d",&i);
	switch(i)
	{
		case 1:
			printf("Enter the element for the new node\n");
			scanf("%d",&n);
			createlist(n);
			break;
		case 2: 
            traverse();
            break;
		case 3:
		    reverse();
			break;
		case 4:
		    traverse();
		    break;
		case 5: 		
	       exit(1);
	    default: printf("Invalid option\n");
	
}
	}
	return 0;
}

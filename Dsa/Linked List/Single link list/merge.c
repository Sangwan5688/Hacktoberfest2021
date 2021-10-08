//Merging two sorted linked list
#include <stdio.h>
#include <stdlib.h>
struct node{
	int data;
	struct node *next; 
}*start1=NULL,*start2=NULL,*start3=NULL;
void createlist(struct node **st,int n)
{
	struct node *temp;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=n;
	new->next=NULL;
	if(*st==NULL)
	*st=new;
	else
	{
		temp=*st;
		while(temp->next!=NULL)
		{
			temp=temp->next;
		}
		temp->next=new;
	}
	
}
void traverse(struct node **st)
{
	struct node *t;
	t=*st;
	if(t==NULL)
	printf("Empty list\n");
	while(t!=NULL)
	{
		printf("%d\t",t->data);
		t=t->next;
	}
}
void merge(struct node **s1,struct node **s2,struct node **s3)
{
	struct node *t1,*t2;
	t1=*s1;
	t2=*s2;
	while(t1!=NULL && t2!=NULL)
	{
		if(t1->data>t2->data){
		createlist(s3,t2->data);
		t2=t2->next;
	}
	    else if(t2->data > t1->data){
	    createlist(s3,t1->data);
	    t1=t1->next;
		}
		else
		{
		createlist(s3,t1->data);
		t1=t1->next;
      t2=t2->next;
		}
      
	}
	while(t1!=NULL)
	{
		createlist(s3,t1->data);
		t1=t1->next;
	}
	while(t2!=NULL)
	{
		createlist(s3,t2->data);
		t2=t2->next;
	}
}
int main() {
	while(1){
	
	printf("If creating a linked list enter the elements in a sorted manner\n");
	printf("Menu Driven\n");
	printf("Option 1: Creating a new node for linked list 1\n");
	printf("Option 2: Display the first linked list\n");
	printf("Option 3: Creating a new node for linked list 2\n");
	printf("Option 4: Display the second linked list\n");
	printf("option 5: Merge the two link list\n");
	printf("option 6: Display the merged linked list\n");
	printf("Option 7: Exit \n");
	int ch,n1,n2;
	printf("Enter user choice\n");
	scanf("%d",&ch);
	switch(ch){
		case 1:
			printf("Enter the element for the new node for linked list 1\n");
			scanf("%d",&n1);
			createlist(&start1,n1);
			break;
		case 2:
			traverse(&start1);
			break;
		case 3:
			printf("Enter the element for the new node for linked list 2\n");
			scanf("%d",&n2);
			createlist(&start2,n2);
		    break;
		case 4:
			traverse(&start2);
			break;
		case 5:
			merge(&start1,&start2,&start3);
			break;
		case 6:
			traverse(&start3);
			break;
		case 7:exit(1);
		default:printf("Invalid choice\n");
	}	
}
	return 0;
}

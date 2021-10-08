//Menu driven program for doubly linked list
#include <stdio.h>
#include <stdlib.h>
struct node{ 	int data;
	struct node *next;
	struct node *prev;
}*start=NULL,*end=NULL;
void createlist(int n)
{
	struct node *t;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=n;
	new->next=NULL;
	new->prev=NULL;
	if(start==NULL)
	{
		start=new;
		end=new;
	}
	else
	{
		new->prev=end;
		end->next=new;
		end=new;
		
	}
}
void traverse()
{
	struct node *t;
	t=start;
	while(t!=end->next)
	{
		printf("%d\t",t->data);
		t=t->next;
	}
}
void del_first_node()
{
	struct node *t;
	t=start;
	start->next->prev=NULL;
	start=start->next;
	free(t);
}
void add_first_node(int d)
{
struct node *new=(struct node *)malloc(sizeof(struct node));
new->data=d;
new->next=start;
start->prev=new;
start=new;
}
void del_last_node()
{
struct node *t;
t=end;
end->prev->next=NULL;
end=end->prev;
free(t);
}
void add_last_node(int n)
{

struct node *new=(struct node *)malloc(sizeof(struct node));
new->data=n;
new->prev=end;
end->next=new;
end=new;
}
void deletegivennode(int d1)
{
	struct node *t;
	t=start;
	while(t->data!=d1)
	{
		t=t->next;
	 } 
	 t->prev->next=t->next;
	 t->next->prev=t->prev;
	 free(t);
}
void add_beforegivennode(int n1,int n2)
{
	struct node *t;
	t=end;
	while(t->data!=n1)
	{
		t=t->prev;
	}
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=n2;
	new->prev=t->prev;
	new->next=t;
	t->prev->next=new;
	t->prev=new;
}
void add_aftergivennode(int val1,int val2)
{
	struct node *t;
	t=start;
	while(t->data!=val1)
	{
		t=t->next;
	}
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=val2;
	new->prev=t;
	new->next=t->next;
	t->next->prev=new;
	t->next=new;
}
void last_occurrence(int nm)
{
	struct node *t1,*t2;
	t1=start;
	int tot=0;
	while(t1!=end->next)
	{
		t1=t1->next;
		tot++;
	}
	t2=end;
	int c=0;
	while(t2->data!=nm)
	{
		t2=t2->prev;
		c++;
	}
	printf("%d occurred last at position %d",t2->data,tot-c);
}
void reverse()
{
	struct node *t1,*t2;
	t1=start;
	t2=end;
	int temp=0;
	while(t1!=t2 && t1->prev!=t2)
	{
		temp=t1->data;
		t1->data=t2->data;
		t2->data=temp;
		t1=t1->next;
		t2=t2->prev;
	}
	
}
int main() {
	int ch;
	int n,d,num,d1,n1,n2,val1,val2,nm;
	while(1)
	{
		printf("\nOption 1: Creation of list\n");
		printf("Option 2: Display\n");
		printf("Option 3: Delete first node\n");
		printf("Option 4: Add first node\n");
		printf("Option 5: Delete last node\n");
		printf("Option 6: Add at the last node\n");
		printf("Option 7: Delete a given node\n");
		printf("Option 8: Add a node before the given node\n");
		printf("Option 9: Add a node after the given node\n");
		printf("Option 10: Last occurrence of a particular node value\n");
		printf("Option 11: Reverse the double link list\n");
		printf("Option 12:Display the reversed the double link list\n");
		printf("Option 13: Exit\n");
		printf("Enter the choice\n");
		scanf("%d",&ch);
		switch(ch)
		{ 
		    case 1:
				printf("Enter the value for the new node\n");
				scanf("%d",&n);
				createlist(n);
				break;
			case 2:
				traverse();
				break;
			case 3:
				 del_first_node();
				 break;
            case 4:
            	printf("Enter the value for the new first node\n");
            	scanf("%d",&d);
            	add_first_node(d);
            	break;
            case 5:
            	del_last_node();
            	break;
            case 6:
            	printf("Enter the first node\n");
            	scanf("%d",&num);
            	add_last_node(num);
            	break;
            case 7:
            	printf("Enter the node value to be deleted\n");
            	scanf("%d",&d1);
            	deletegivennode(d1);
            	break;
            case 8:
            	printf("Enter the node before which a new node is to be added\n");
            	scanf("%d",&n1);
            	printf("Enter the value for the new node\n");
            	scanf("%d",&n2);
            	add_beforegivennode(n1,n2);
            	break;
            case 9:
            	printf("Enter the node value after which a new node is to be added\n");
            	scanf("%d",&val1);
            	printf("Enter the value for new node\n");
            	scanf("%d",&val2);
            	add_aftergivennode(val1,val2);
            	break;
            case 10:
            	printf("Enter the value whose last occurrence is to be checked\n");
            	scanf("%d",&nm);
            	last_occurrence(nm);
            	break;
            case 11:
            	reverse();
            	break;
            case 12:
            	traverse();
            	break;
			case 13:
				exit(1);
			default: printf("Invalid option\n");
		}
	}
	
	return 0;
}





























































































































































































































































































































































































































 

























































































































































































































































































































 













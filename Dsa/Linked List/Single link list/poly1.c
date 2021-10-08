#include <stdio.h>
#include <stdlib.h>
struct node {
	int expo;
	int coef;
	struct node *next;
}*start=NULL;

createpoly(int e,int c)
{
	struct node *t;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->expo=e;
	new->coef=c;
	new->next=NULL;
	if(start==NULL)
	start=new;
	else{
		t=start;
		while(t->next!=NULL)
		{
			t=t->next;
		}
		t->next=new;
	}
}
traverse()
{
	struct node *t;
	t=start;
	while(t!=NULL)
	{
	printf("Coefficient: %d\n",t->coef);
	printf("Exponent:%d\n",t->expo);
	t=t->next;
	}
}
int main() {
	int e,c;
	while(1)
	{
		printf("Option 1: Create a new node for polynomial \n");
		printf("Option 2: Display  the polynomial linked list\n");
		printf("Exit \n");
		int ch;
		printf("Enter user choice\n");
		scanf("%d",&ch);
		switch(ch)
		{
			case 1:
				printf("Enter the coefficient of the term\n");
				scanf("%d",&c);
				printf("Enter the exponent of the term\n");
				scanf("%d",&e);
				createpoly(e,c);
				break;
			case 2:
				traverse();
				break;
			case 3:
				exit(1);
			default:printf("Invalid option\n");
		}
	}
	return 0;
}

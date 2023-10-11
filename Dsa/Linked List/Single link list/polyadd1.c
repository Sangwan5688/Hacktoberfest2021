#include <stdio.h>
#include <stdlib.h>

struct node {
	int expo;
	int coef;
	struct node *next;
}*start1=NULL,*start2=NULL,*start3=NULL;

createpoly(struct node **st,int e,int c)
{
	struct node *t;
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->expo=e;
	new->coef=c;
	new->next=NULL;
	if(*st==NULL)
	*st=new;
	else{
		t=*st;
		while(t->next!=NULL)
		{
			t=t->next;
		}
		t->next=new;
	}
}
traverse(struct node **st)
{
	struct node *t;
	t=*st;
	while(t!=NULL)
	{
	printf("Coefficient: %d\n",t->coef);
	printf("Exponent:%d\n",t->expo);
	t=t->next;
	}
}
void polyadd(struct node **s1,struct node **s2,struct node **s3)
{
	struct node *t1,*t2;
	t1=*s1;
	t2=*s2;
	while(t1!=NULL && t2!=NULL)
	{
		if(t1->expo> t2->expo)
		{
			createpoly(s3,t1->expo,t1->coef);
		t1=t1->next;
		}
		else if(t1->expo<t2->expo)
		{
			createpoly(s3,t2->expo,t2->coef);
			t2=t2->next;
		}
		else
		{
			if(t1->coef+t2->coef)
			{
				createpoly(s3,t1->expo,t1->coef+t2->coef);
				t1=t1->next;
				t2=t2->next;
			}
		}
	}
	while(t1!=NULL)
	{
		createpoly(s3,t1->expo,t1->coef);
		t1=t1->next;
	}
	while(t2!=NULL)
	{
		createpoly(s3,t2->expo,t2->coef);
		t2=t2->next;
	}
}
int main() {
	int e1,c1,e2,c2;
	while(1)
	{
		printf("Option 1: Create a new node for polynomial 1\n");
		printf("Option 2: Display  the polynomial linked list 1\n");
		printf("Option 3: Create a new node for polynomial 2\n");
		printf("Option 4: Display  the polynomial linked list 2\n");
		printf("Option 5: Add the polynomials\n");
		printf("Option 6: Display the new polynomial\n");
		printf("Option 7: Exit \n");
		int ch;
		printf("Enter user choice\n");
		scanf("%d",&ch);
		switch(ch)
		{
			case 1:
				printf("Enter the coefficient of the term\n");
				scanf("%d",&c1);
				printf("Enter the exponent of the term\n");
				scanf("%d",&e1);
				createpoly(&start1,e1,c1);
				break;
			case 2:
				traverse(&start1);
				break;
			case 3:
				printf("Enter the coefficient of the term\n");
				scanf("%d",&c2);
				printf("Enter the exponent of the term\n");
				scanf("%d",&e2);
				createpoly(&start2,e2,c2);
				break;
			case 4:
				traverse(&start2);
				break;
			case 5:
				polyadd(&start1,&start2,&start3);
				break;
			case 6:
				traverse(&start3);
				break;
			case 7:	
			   exit(1);
			   default:printf("Invalid option\n");
		}
	}
	return 0;
}

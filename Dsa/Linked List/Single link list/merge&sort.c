//Merging two sorted linked list

#include <stdio.h>
#include <stdlib.h>
struct node1{
	int data1;
	struct node1 *next1;
}*start1=NULL;
createlist1()
{
	int num1;
	printf("Enter the element for the new node\n");
	scanf("%d",&num1);
	struct node1 *temp;
	struct node1 *new=(struct node *)malloc(sizeof(struct node));
	new->data1=num1;
	new->next1=NULL;
	if(start1==NULL)
	start1=new;
	else
	{
		temp=start;
		while(temp->next1!=NULL)
		{
			temp=temp->next1;
		}
		temp->next1=new;
	}
}

traverse1()
{
	struct node1 *temp;
	temp=start1;
	while(temp!=NULL)
	{
		printf("%d\t",&temp->data1);
		temp=temp->next1;
	}
}

int main() {
	while(1){
	
	printf("If creating a linked list enter the elements in a sorted manner\n");
	printf("Menu Driven\n");
	printf("Option 1: Creating the a new node for linked list 1\n");
	printf("Option 2: Display the first linked list\n");
	printf("Option 3: Exit \n");
	int ch;
	printf("Enter user choice\n");
	scanf("%d",&ch);
	switch(ch){
		case 1:
			createlist1();
			break;
		case 2:
			traverse1();
			break;
		case 3:Exit(1);
		default:printf("Invalid choice\n");
	}
	
}
	return 0;
}

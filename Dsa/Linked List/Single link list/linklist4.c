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
void insert_before_node(int data1,int num){
	struct node *t1,*t2;
	t1=start;
	t2=start;
	while(t2->data!=data1){
		t1=t2;
		t2=t2->next;
	}
	struct node *new=(struct node *)malloc(sizeof(struct node));
	new->data=num;
	t1->next=new;
	new->next=t2;
}
void delete_given_node(int data2){
	struct node *t1,*t2;
	t1=t2=start;
	while(t2->data!=data2)
	{
		t1=t2;
		t2=t2->next;
	}
	t1->next=t2->next;
	free(t2);
}
void delete_last_node(){
	struct node *t1,*t2;
	t1=t2=start;
	while(t2->next!=NULL)
	{
		t1=t2;
		t2=t2->next;
	}
	t1->next=NULL;
	free(t2);
}
void add_first_node(int m)
{
	struct node *new =(struct node *)malloc(sizeof(struct node));
	new->data=m;
	new->next=start;
	start=new;
}
void delete_first_node(){
	struct node *t;
	t=start;
	start=start->next;
	free(t);
}
 void reverse() 
    { 
        struct node  *t = start; 
        struct node *prev = NULL, *next = NULL; 
  
        while (t!= NULL) { 
             
            next = t->next; 
  
            
            t->next = prev; 
  
            
            prev = t; 
            t= next; 
        } 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        start = prev; 
    } 
 
 void search(int x){
 	struct node *t;int c=0;
 	t=start;
	 while(t->next!=NULL)
 	{
 		t=t->next;
 		if(t->data==x)
 		{
		 printf("Found\n");
 		c++;
 		break;
		 }
	 }
	 if(c==0)
	 printf("Not found\n");
 }
void count_occurance(int x){
	struct node *t;
	int c=0;
	t=start;
	while(t->next!=NULL)
	{
		t=t->next;
		if(t->data==x)
		c++;
	}
	printf("Number of occurance of %d is %d",x,c);
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
	int n,i,d1,num,d2,m,numb;
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
    printf("\nEnter the option for an operation\n");
    printf("Option 1: Insert a node before any node\n");
    printf("Option 2: Delete a given node\n");
    printf("Option 3: Delete the last node\n");
    printf("Option 4: Add first node\n");
    printf("Option 5: Delete the first node\n");
    printf("Option 6: Reverse the linked list\n");
    printf("option 7: Search an element in a linked list\n");
    printf("Option 8: Count the occurances of a particular element of the linked list\n");
	//Menu-Driven:
	int j;
    scanf("%d",&j);
    if(j==1){
	printf("Enter the list memeber before which a new node is to be inserted \n");
	scanf("%d",&d1);
	printf("Enter the element to be inserted before the desired node\n");
	scanf("%d",&num);
	insert_before_node(d1,num);
	traverse();
}
    else if(j==2){
    printf("Enter the node elment to be deleted\n");
    scanf("%d",&d2);
    delete_given_node(d2);
    traverse();
	}
	else if(j==3)
	{
	printf("Deleting the last node\n");
	delete_last_node();
	traverse();
	}
	else if(j==4)
	{
	printf("Enter the element for the new first node \n");
	scanf("%d",&m);
	add_first_node(m);
	traverse();
	}
	else if(j==5)
	{
		delete_first_node();
		traverse();
	}
	else if(j==6)
	{
		reverse();
		traverse();
	}
	else if(j==7)
	{
	 printf("Enter the number to be searched in the linklist\n");
	 scanf("%d",&numb);
	 search(numb);
	}
	else if(j==8)
	{
	int d;
	printf("Enter the element whose occurance is to be counted\n");
	scanf("%d",&d);
	count_occurance(d);
	}
	return 0;
}

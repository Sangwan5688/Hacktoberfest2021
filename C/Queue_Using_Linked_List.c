#include<stdio.h>
#include<stdlib.h>
struct node{
 int data;
	struct node *next;
};
struct node *front=0;
struct node *rear=0;

void enqueue(int x)
{
	struct node *newnode;
	newnode= (struct node*)malloc(sizeof(struct node));
	newnode->data=x;
	newnode->next=0;
	//check whether the queue is empty or not
	if(front==0 && rear==0)
	{
		front = rear = newnode;
	}
	else 
	{
		rear->next=newnode;
		rear=newnode;
	}
}
void dequeue()
	{
	struct node *ptr;  
    if(front == NULL)  
    {  
        printf("\nQUEUE UNDERFLOW\n");  
        //return;  
    }  
    else   
    {  
        ptr = front;  
        front = front -> next;
		printf("Data Deleted : %d\n",ptr->data);
        free(ptr);  
    }  
	}
void display()
{
	struct node *temp;
	if(front==0 && rear==0)
	{
		printf("QUEUE EMPTY");
		}
	else 
	{   temp=front;
		while(temp!=0)
		{
			printf("%d\n",temp->data);
	     temp=temp->next;
		}
	}
}
	
int main()
{   int ch,n;
	 do {  
	    printf("\nMENU :");
        printf("\n1.EnQueue Operation\n2.DeQueue Operation\n3.Display Queue\n4.EXIT \nEnter Your Choice : ");
        scanf("%d", &ch);
        switch (ch) 
		{       
		        case 1:
            	printf("Enter Data to insert in Queue:");
	            scanf("%d",&n);	
			    enqueue(n);
			    break;
			case 2:
            	dequeue();
            	break;
			case 3:
            	display();
            	break;
            case 4:
                printf("\nEXITING PROGRAM\n");
				break; 
            default:
                printf("\nINVALID CHOICE\n");
                break;	          	
    } 
	}while (ch!=4);
      return 0;
}

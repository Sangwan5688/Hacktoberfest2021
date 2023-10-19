#include <stdio.h>   
# define max 6  
int queue[max];  // array declaration  
int front=-1;  
int rear=-1;  
// function to insert an element in a circular queue  
void enqueue(int d)  
{  
    if(front==-1 && rear==-1)   // condition to check queue is empty  
    {  
        front=0;  
        rear=0;  
        queue[rear]=d;  
    }  
    else if((rear+1)%max==front)  // condition to check queue is full  
    {  
        printf("QUEUE OVERFLOW\n");  
    }  
    else  
    {  
        rear=(rear+1)%max;       // rear is incremented  
        queue[rear]=d;     // assigning a value to the queue at the rear position.  
    }  
}  
  
// function to delete the element from the queue  
void dequeue()  
{  
    if((front==-1) && (rear==-1))  // condition to check queue is empty  
    {  
        printf("\nQUEUE UNDERFLOW\n");  
    }  
 else if(front==rear)  
{  
   printf("\nDequeued Element : %d", queue[front]);  
   front=-1;  
   rear=-1;  
}   
else  
{  
    printf("\nDequeued Element : %d", queue[front]);  
   front=(front+1)%max;  
}  
}  
// function to display the elements of a queue  
void display()  
{  
    int i=front;  
    if(front==-1 && rear==-1)  
    {  
        printf("\nQUEUE EMPTY\n");  
    }  
    else  
    {  
        printf("\nDISPLAYING QUEUE ELEMENTS :\n");  
        while(i<=rear)  
        {  
            printf("%d\n", queue[i]);  
            i=(i+1)%max;  
        }  
    }  
}  
int main()  
{  
    int ch=1,x;    
      
    while(ch<4 && ch!=0) 
    {  
    printf("\nMENU :");
        printf("\n1.Enqueue Operation\n2.Dequeue Operation\n3.Display Circular Queue\n4.EXIT \nEnter Your Choice : ");
        scanf("%d", &ch);
      
    switch(ch)  
    {  
          
        case 1: 
        printf("Enter the element which is to be inserted : ");  
        scanf("%d", &x);  
        enqueue(x);  
        break;  
        case 2:  
        dequeue();  
        break;  
        case 3:  
        display();
        break;
        default:
        printf("\nINVALID CHOICE\n"); 
        break;
    }}  
    return 0;  
}  

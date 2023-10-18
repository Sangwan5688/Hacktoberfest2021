#include <stdio.h>  
#include <stdlib.h>  
void push();  
void pop();  
void display();  

struct node   
{  
int data;  
struct node *next;  
};  
struct node *head;  
  
int main ()  
{  
    int ch;     
    do
    {    
        printf("MENU :\n1.PUSH\n2.POP\n3.DISPLAY\n4.Exit\nEnter your choice :");        
        scanf("%d",&ch);  
        switch(ch)  
        {  
            case 1:  
            {   
                push();  
                break;  
            }  
            case 2:  
            {  
                pop();  
                break;  
            }  
            case 3:  
            {  
                display();  
                break;  
            }  
            case 4:   
            {  
               printf("\nEXITING PROGRAM\n"); 
                break;   
            }  
            default:  
            {  
                printf("\nINVALID CHOICE\n"); 
                break;
            }   
    }
} while(ch != 4); 
return 0;
}  
void push ()  
{  
    int data;  
    struct node *ptr = (struct node*)malloc(sizeof(struct node));   
    if(ptr == NULL)  
    {  
        printf("\nSTACK OVERFLOW\n");   
    }  
    else   
    {  
        printf("Enter the value :");  
        scanf("%d",&data);  
        if(head==NULL)  
        {         
            ptr->data= data;  
            ptr -> next = NULL;  
            head=ptr;  
        }   
        else   
        {  
            ptr->data= data;  
            ptr->next = head;  
            head=ptr;  
               
        }  
        printf("Item pushed \n");  
          
    }  
}  
  
void pop()  
{  
    int item;  
    struct node *ptr;  
    if (head == NULL)  
    {  
        printf("\nStack Underflow\n");  
    }  
    else  
    {  
        item = head->data;  
        ptr = head;  
        head = head->next;  
        free(ptr);  
        printf("Item popped\n");  
          
    }  
}  
void display()  
{  
    int i;  
    struct node *ptr;  
    ptr=head;  
    if(ptr == NULL)  
    {  
        printf("\nStack is empty\n");  
    }  
    else  
    {  
        printf("\nPrinting Stack elements :-\n");  
        while(ptr!=NULL)  
        {  
            printf("%d\n",ptr->data);  
            ptr = ptr->next;  
        } 
		 printf("\n");
    }  
}  

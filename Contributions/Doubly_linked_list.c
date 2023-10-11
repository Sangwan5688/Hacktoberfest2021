#include <stdio.h>
#include <stdlib.h>

struct node
{   int data;
    struct node* next;
    struct node* prev;
};

void insert_l(struct node** head_r,int item)
{   struct node* newNode=(struct node*)malloc(sizeof(struct node));
    newNode->data=item;
    newNode->next=(*head_r);
    newNode->prev=NULL;
    if((*head_r)!=NULL)
        (*head_r)->prev=newNode;
    (*head_r)=newNode;
}

void insert_r(struct node** head_r,int item)
{   struct node* newNode=(struct node*)malloc(sizeof(struct node));
    struct node* last=(*head_r);
    newNode->data=item;
    newNode->next=NULL;
    if((*head_r)==NULL)
    {   newNode->prev=NULL;
        (*head_r)=newNode;
        return;
    }
    while(last->next!=NULL)
        last=last->next;
    last->next=newNode;
    newNode->prev=last;
    return;
}

void delete_l(struct node** head_r)
{   struct node* temp;
    if((*head_r)==NULL)
        printf("\nLIST EMPTY..");
    else if((*head_r)->next==NULL)
    {   printf("\nDeleted element: %d->",(*head_r)->data);
        (*head_r)=NULL;
        free((*head_r));
    }
    else
    {   temp=(*head_r);
        (*head_r)=(*head_r)->next;
        (*head_r)->prev=NULL;
        printf("\nDeleted element: %d->",temp->data);
        free(temp);
    }
}

void delete_r(struct node** head_r)
{   struct node* temp;
    if((*head_r)==NULL)
        printf("\nLIST EMPTY.."); 
    else if((*head_r)->next==NULL)
    {   printf("\nDeleted element: %d->",(*head_r)->data);
        (*head_r)=NULL;
        free((*head_r));
    }
    else
    {   temp=(*head_r);
        while(temp->next!=NULL)
            temp=temp->next;
        printf("\nDeleted element: %d->",temp->data);
        temp->prev->next=NULL;
        free(temp);
    }
}

void printList(struct node* node)
{
    while(node!=NULL)
    {   printf("%d->",node->data);
        node=node->next;
    }
}

int main()
{   int ch,item;
    struct node* head=NULL;
    do{
        printf("\n1.INSERT_L");
        printf("\n2.INSERT_R");
        printf("\n3.DELETE_L");
        printf("\n4.DELETE_R");
        printf("\n5.EXIT");
        printf("\nEnter choice:");
        scanf("%d",&ch);
        switch(ch)
        {   case 1: printf("\nEnter item:");
                    scanf("%d",&item);
                    insert_l(&head,item);
                    printList(head);
                    break;
            case 2: printf("\nEnter item:");
                    scanf("%d",&item);
                    insert_r(&head,item);
                    printList(head);
                    break;
            case 3: delete_l(&head);
                    printf("\n");
                    printList(head);
                    break;
            case 4: delete_r(&head);
                    printf("\n");
                    printList(head);
                    break;
            case 5: exit(0);
            default:printf("\nInvalid choice..");
        }
    }while(1);
    return 0;
}

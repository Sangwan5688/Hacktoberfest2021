#include <stdio.h>
#include <stdlib.h>
typedef struct node
{
    int val;
    struct node*next;
}NODE;
NODE*createlist(NODE*head,int n)
{
    NODE*p,*temp;
    int i;
    for(int i=0;i<n;i++)
    {
        temp=(NODE*)malloc(sizeof(NODE));
        if(temp==NULL)
        {
            printf("Memory allocation failed");
            exit(0);
        }
        printf("Enter element: ");
        scanf("%d",&temp->val);
        if(head==NULL)
        {
            head=temp;
        }
        else
        {
            p->next=temp;
        }
        p=temp;
    }
    p->next=NULL;
    return head;
}
NODE*deletenth(NODE*head, int key)
{
    NODE*temp,*p;
    int c=-1;
    for(p=head;p!=NULL;p=p->next)
    {
        c++;
        if(key==0)
        {
            temp=p->next;
            return temp;
        }
        if(c==key-1)
        {
            if(p->next!=NULL)
            {
                p->next=p->next->next;
            }
            else
            {
                p->next=NULL;
            }
        }
    }
    return head;
}
void display(NODE*head)
{
    NODE*temp;
    for(temp=head;temp!=NULL;temp=temp->next)
    {
        printf("%d",temp->val);
    }
    printf("\n");
}
void main()
{
    NODE*head=NULL;
    int n;
    printf("Enter the number of nodes: ");
    scanf("%d",&n);
    head=createlist(head,n);
    display(head);
    int key;
    printf("Enter the index: ");
    scanf("%d", &key);
    head=deletenth(head,key);
    display(head);
}
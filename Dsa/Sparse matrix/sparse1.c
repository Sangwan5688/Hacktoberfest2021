#include<stdio.h>
#include<stdlib.h>

struct node 
{
int row,col,value;
struct node *next;
}*head=NULL;
void create(int a[10][20],int m,int n)
{
struct node *temp;
struct node *new=(struct node *)malloc(sizeof(struct node));
int i,j;
for(i=0;i<m;i++)
{
    for(j=0;j<n;j++)
    {
        if(a[i][j]!=0)
        {
            if(head->next==NULL)
            {
                new->row=i;
                new->col=j;
                new->value=a[i][j];
                head->next=new;
                (head->value)++;
            }
            else
            {
                temp=head->next;
                while(temp->next!=NULL)
                temp=temp->next;
                new->row=i;
                new->col=j;
                new->value=a[i][j];
                temp->next=new;
                (head->value)++;
            }
            
        }
    }
}
}
void display()
{
    struct node *t;
    t=head;
    while(t!=NULL)
    {
        printf("%d\t%d\t%d\n",t->row,t->col,t->value);
        t=t->next;
    }

}
int main()
{
    int m,n,ch;
    int i,j;
    printf("Enter the number of rows\n");
    scanf("%d",&m);
    printf("Enter the number of columns\n");
    scanf("%d",&n);
    int a[10][20];
    for(i=0;i<m;i++)
    {
        for(j=0;j<n;j++)
        {
          scanf("%d",&a[i][j]);
        }
    }
    struct node *head=(struct node *)malloc(sizeof(struct node));
    head->row=m;
    head->col=n;
    head->value=0;
    head->next=NULL;
   while(1)
   {
       printf("1: Creating triplet form the given sparse matrix\n");
       printf("2: Displaying triplet form of the given sparse matrix\n");
       printf("3: Exit\n");
       printf("Enter ur choice\n");
       scanf("%d",&ch);
       switch(ch)
       {
           case 1:
           create(a,m,n);
           break;
           case 2:
           display();
           break;
           case 3:
           exit(1);
           default: printf("Invalid option\n");
       }
   }   

}
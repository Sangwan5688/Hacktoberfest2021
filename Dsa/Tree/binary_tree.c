#include<stdio.h>
#include<stdlib.h>

struct node
{
int data;
struct node *lptr;
struct node *rptr;
};
void create_btree(struct node **r,int n,int p)
{
struct node *new=(struct node *)malloc(sizeof(struct node));
new->data=n;
new->lptr=NULL;
new->rptr=NULL;
if(((*r)==NULL)&&(p==3))
(*r)=new;
else
{
    struct node *ptr=(*r),*parent;
    while(ptr!=NULL)
    {
      parent=ptr;
      if(p==1)
      ptr=ptr->lptr;
      else if(p==2)
      ptr=ptr->rptr;    
    }
    if(p==1)
    parent->lptr=new;
    else
    parent->rptr=new;
}
}
void preorder(struct node **r)
{
    if ((*r) != NULL)
    {
        printf("%d ",(*r)->data);
        preorder(&((*r)->lptr));
        preorder(&((*r)->rptr));
    }
}
void inorder(struct node **r)
{
    if ((*r) != NULL)
    {
        inorder(&((*r)->lptr));
        printf("%d ",(*r)->data);
        inorder(&((*r)->rptr));
    }
}
void postorder(struct node **r)
{
    if ((*r) != NULL)
    {
        postorder(&((*r)->lptr));
        postorder(&((*r)->rptr));
        printf("%d ",(*r)->data);
    }
}

int main()
{
struct node *root=NULL;
int num,pos,ch;
while(1)
{
    printf("1: Create a new node\n");
    printf("2: Preorder traversal\n");
    printf("3: Inorder traversal\n");
    printf("4: Post-order traversal\n");
    printf("5: Exit\n");
    printf("Enter your choice\n");
    scanf("%d",&ch);
    switch(ch)
    {
        case 1:
        printf("Enter the data\n");
        scanf("%d",&num);
        printf("1: Left \n");
        printf("2: Right\n");
        printf("3: Root\n");
        printf("Enter the position to enter\n");
        scanf("%d",&pos);
        create_btree(&root,num,pos);
        break;
        case 2:
        preorder(&root);
        break;
        case 3:
        inorder(&root);
        break;
        case 4:
        postorder(&root);
        break;
        case 5:
        exit(1);
        default: printf("Invalid choice\n");
    }
}
return 0;
}
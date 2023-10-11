//Manak Sinha
//1905602
//Binary search tree Linked list
#include <stdio.h>
#include <stdlib.h>
struct node
{
    int data;
    struct node *lptr;
    struct node *rptr;
};
struct stack
{
    struct node *data;
    struct stack *next;
};
void push(struct stack **s, struct node *n)
{
    struct stack *new = (struct stack *)malloc(sizeof(struct stack));
    new->data = n;
    new->next = (*s);
    (*s) = new;
}
struct node *pop(struct stack **s)
{
    struct stack *t = (*s);
    if ((*s) == NULL)
        return NULL;
    else
    {
        struct node *d = t->data;
        (*s) = (*s)->next;
        free(t);
        return (d);
    }
}
struct myqueue
{
    struct node *data;
    struct myqueue *next;
};

void enqueue(struct myqueue **f, struct myqueue **r, struct node *n)
{
    struct myqueue *new = (struct myqueue *)malloc(sizeof(struct myqueue));
    if (new == NULL)
        printf("Overflow\n");
    else
    {
        new->data = n;
        new->next = NULL;
        if ((*f) == NULL)
            (*f) = (*r) = new;
        else
        {
            (*r)->next = new;
            (*r) = new;
        }
    }
}
struct node *dequeue(struct myqueue **f, struct myqueue **r)
{
    struct myqueue *t = (*f);
    if ((*f) == NULL)
        return NULL;
    else
    {
        struct node *b = t->data;
        (*f) = (*f)->next;
        free(t);
        return (b);
    }
}
void create_bst_tree(struct node **r, int n)
{
    struct node *new;
    new = (struct node *)malloc(sizeof(struct node));
    new->data = n;
    new->lptr = NULL;
    new->rptr = NULL;
    if ((*r) == NULL)
        (*r) = new;
    else
    {
        struct node *p = (*r), *parent = NULL;
        while (p != NULL)
        {
            parent = p;
            if (n < p->data)
                p = p->lptr;
            else
            {
                p = p->rptr;
            }
        }
        if (n < parent->data)
            parent->lptr = new;
        else
            parent->rptr = new;
    }
}
void preorder(struct node **r)
{
    if ((*r) != NULL)
    {
        printf("%d ", (*r)->data);
        preorder(&((*r)->lptr));
        preorder(&((*r)->rptr));
    }
}
void inorder(struct node **r)
{
    if ((*r) != NULL)
    {
        inorder(&((*r)->lptr));
        printf("%d ", (*r)->data);
        inorder(&((*r)->rptr));
    }
}
void postorder(struct node **r)
{
    if ((*r) != NULL)
    {
        postorder(&((*r)->lptr));
        postorder(&((*r)->rptr));
        printf("%d ", (*r)->data);
    }
}
void reverse_inorder(struct node **r)
{
    if ((*r) != NULL)
    {
        reverse_inorder(&((*r)->rptr));
        printf("%d ", (*r)->data);
        reverse_inorder(&((*r)->lptr));
    }
}
void largest_number(struct node **r)
{
    struct node *t;
    t = (*r);
    while (t->rptr != NULL)
    {
        t = t->rptr;
    }
    printf("%d", t->data);
}
void smallest_number(struct node **r)
{
    struct node *ptr;
    ptr = (*r);
    while (ptr->lptr != NULL)
    {
        ptr = ptr->lptr;
    }
    printf("%d", ptr->data);
}

void preorder_non_recursive(struct node *r)
{
    struct node *ptr = (r);
    struct stack *start = NULL;
    while (ptr != NULL)
    {
        printf("%d ", ptr->data);
        if (ptr->rptr != NULL)
        {
            push(&start, ptr->rptr);
        }
        if (ptr->lptr != NULL)
        {
            ptr = ptr->lptr;
        }
        else
        {
            ptr = pop(&start);
        }
    }
}
void inorder_non_recursive(struct node *r)
{
    struct node *ptr = (r);
    struct stack *start = NULL;
    push(&start,ptr);
    while (ptr != NULL)
    {
        
        if (ptr->rptr != NULL)
        {
            push(&start, ptr->rptr);
        }
        if (ptr->lptr != NULL)
        {
            ptr=ptr->lptr;
        }
        printf("%d",ptr->data);   
 
            ptr = pop(&start);
    }
}
void level_order(struct node **r)
{
    struct myqueue *front = NULL, *rear = NULL;
    struct node *ptr = (*r);
    while (ptr != NULL)
    {
        printf("%d ", ptr->data);
        if (ptr->lptr != NULL)
            enqueue(&front, &rear, ptr->lptr);
        if (ptr->rptr != NULL)
            enqueue(&front, &rear, ptr->rptr);

        ptr = dequeue(&front, &rear);
    }
}
int main()
{
    struct node *root = NULL;
    int num, ch;
    while (1)
    {
        printf("\n");
        printf("1: Create a new node for BST tree\n");
        printf("2: Pre-order Traversal(Recursive\n");
        printf("3: Inorder Traversal(Recursive)\n");
        printf("4: Post-order Traversal(Recursive)\n");
        printf("5: Pre-order Traversal(Non-Recursive)\n");
        printf("6: Inorder Traversal(Non-Recursive)");
        printf("7: Level-order Traversal\n");
        printf("8: BST elements in descending order\n");
        printf("9: Smallest Number present in the tree\n");
        printf("10: Largest number present in the tree\n");
        printf("11: Exit\n");
        printf("Enter your choice\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the value\n");
            scanf("%d", &num);
            create_bst_tree(&root, num);
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
            preorder_non_recursive(root);
            break;
        case 6:
            inorder_non_recursive(root);
            break;
        case 7:
            level_order(&root);
            break;
        case 8:
            reverse_inorder(&root);
            break;
        case 9:
            smallest_number(&root);
            break;
        case 10:
            largest_number(&root);
            break;
        case 11:
            exit(1);
        default:
            printf("Invalid choice\n");
        }
    }
    return 0;
}

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

void push(struct stack **s, struct node *num)
{
    struct stack *new = (struct stack *)malloc(sizeof(struct stack));
    new->data = num;
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
struct queue
{
    struct node *data;
    struct queue *next;
};

void enqueue(struct queue **f, struct queue **r, struct node *n)
{
    struct queue *new = (struct queue *)malloc(sizeof(struct queue));
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
struct node *dequeue(struct queue **f, struct queue **r)
{
    struct queue *t = (*f);
    if ((*f)== NULL)
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
    struct node *new = (struct node *)malloc(sizeof(struct node));
    new->data = n;
    new->lptr = NULL;
    new->rptr = NULL;
    if ((*r) == NULL)
        (*r) = new;
    else
    {
        struct node *ptr = (*r), *parent = NULL;
        while (ptr != NULL)
        {
            parent = ptr;
            if (n < ptr->data)
                ptr = ptr->lptr;
            else
                ptr = ptr->rptr;
        }
        if (n < parent->data)
            parent->lptr = new;
        else
            parent->rptr = new;
    }
}
void preorder(struct node **r)
{
    while ((*r) != NULL)
    {
        printf("%d ", (*r)->data);
        preorder(&(*r)->lptr);
        preorder(&(*r)->rptr);
    }
}

void inorder(struct node **r)
{
    while ((*r) != NULL)
    {
        inorder(&(*r)->lptr);
        printf("%d ", (*r)->data);
        inorder(&(*r)->rptr);
    }
}
void postorder(struct node **r)
{
    while ((*r) != NULL)
    {
        postorder(&(*r)->lptr);
        postorder(&(*r)->rptr);
        printf("%d ", (*r)->data);
    }
}

void reverse_inorder(struct node **r)
{
    while ((*r) != NULL)
    {
        reverse_inorder(&(*r)->rptr);
        printf("%d ", (*r)->data);
        reverse_inorder(&(*r)->lptr);
    }
}

void preorder_non_recursive(struct node *r)
{
    struct node *ptr = r;
    struct stack *start = NULL;
    while (ptr != NULL)
    {
        printf("%d ", ptr->data);
        if (ptr->rptr != NULL)
            push(&start, ptr->rptr);
        if (ptr->lptr != NULL)
            ptr = ptr->lptr;
        else
        {
            ptr = pop(&start);
        }
    }
}
void levelorder(struct node **r)
{
    struct node *ptr = (*r);
    struct queue *front = NULL;
    struct queue *rear = NULL;
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
int main()
{
    struct node *root = NULL;
    int ch, num;
    while (1)
    {
        printf("1: Create a new node for the tree\n");
        printf("2: Preorder Traversal(Recursive)\n");
        printf("3: Inorder Traversal(Recursive)\n");
        printf("4: Postorder Traversal(Recursive)\n");
        printf("5: Preorder Traversal(Non-Recursive)\n");
        printf("6: Level-order Traversal\n");
        printf("7: Bst Traversal in Decreasing sorted order\n");
        printf("8: Largest number in the tree\n");
        printf("9: Smallest number in the tree\n");
        printf("10: Exit\n");
        printf("Enter your choice\n");
        scanf("%d", &ch);
        switch (ch)
        {
        case 1:
            printf("Enter the data\n");
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
            levelorder(&root);
            break;
        case 7:
            reverse_inorder(&root);
            break;
        case 8:
            largest_number(&root);
            break;
        case 9:
            smallest_number(&root);
            break;
        case 10:
            exit(1);
        default:
            printf("Invalid choice\n");
        }
    }
    return 0;
}
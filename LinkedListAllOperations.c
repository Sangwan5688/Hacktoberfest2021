#include <stdio.h>
#include <stdlib.h>
typedef struct Node
{
    int data;
    struct Node *next;
} Node;
void push(Node **, int);
void traverse(Node *);
int isEmpty(Node *);
void insert_after(Node **, int, int);
void insert_before(Node **, int, int);
void delete_after(Node **, int);
void delete_before(Node **, int);
void insert_at(Node **, int, int);
void delete_at(Node **, int);
void delete_key(Node **, int);
Node *search(Node *, int);
void empty_the_list(Node **);
void sort(Node **);
void print_in_rev(Node *);
void reverse_the_nodes(Node **);
void nth_node_from_last(Node *, int);
void del_duplicate(Node **);
int main()
{
    Node *list1 = NULL;
    int choice, position, value;
    do
    {
        printf("Enter your choice:\n1) Create a new node\n2) Traverse the list\n");
        printf("3) Check  if the list is  empty?\n");
        printf("4) Insert the node after...\n5) Insert the node before...\n6) Delete node after...\n");
        printf("7) Delete node before...\n8) Insert at position\n9) Delete at position\n");
        printf("10) Delete a node for the given key\n11) Search for...\n12) Sort the list\n");
        printf("13) Print the elements in reverse\n14) Reverse the list\n");
        printf("15) Print nth node from end\n16) Delete all duplicate items\n");
        printf("17) Drop the list\n18) Quit\n-->: ");
        scanf("%d", &choice);
        switch (choice)
        {
        case 1:
            printf("\nEnter an element: ");
            scanf("%d", &value);
            push(&list1, value);
            break;
        case 2:
            printf("\n");
            traverse(list1);
            break;
        case 3:
            printf("\nEmpty: ");
            printf((isEmpty(list1) ? "List is Empty\n" : "List is Not Empty\n"));
            break;
        case 4:
            printf("\nEnter value after which to insert: ");
            scanf("%d", &position);
            printf("Enter the element to insert: ");
            scanf("%d", &value);
            insert_after(&list1, position, value);
            break;
        case 5:
            printf("\nEnter value before which to insert: ");
            scanf("%d", &position);
            printf("Enter the element to insert: ");
            scanf("%d", &value);
            insert_before(&list1, position, value);
            break;
        case 6:
            printf("\nEnter value after which to delete: ");
            scanf("%d", &position);
            delete_after(&list1, position);
            break;
        case 7:
            printf("\nEnter value before which to delete: ");
            scanf("%d", &value);
            delete_before(&list1, value);
            break;
        case 8:
            printf("\nEnter the position at which to insert: ");
            scanf("%d", &position);
            printf("Enter value to insert: ");
            scanf("%d", &value);
            insert_at(&list1, position, value);
            break;
        case 9:
            printf("Enter the position to delete at : ");
            scanf("%d", &position);
            delete_at(&list1, position);
            break;
        case 10:
            printf("\nEnter the key element: ");
            scanf("%d", &value);
            delete_key(&list1, value);
            break;
        case 11:
            printf("\nSearch for element: ");
            scanf("%d", &value);
            printf("Element found at position(s): ");
            Node *LinkList = search(list1, value);
            traverse(LinkList);
            empty_the_list(&LinkList);
            break;
        case 12:
            printf("\nThe list is sorted!\n");
            sort(&list1);
            break;
        case 13:
            printf("\n");
            print_in_rev(list1);
            printf("\b\b ");
            printf("\n");
            break;
        case 14:
            printf("\nThe list is  reversed!\n");
            reverse_the_nodes(&list1);
            break;
        case 15:
            printf("\nEnter node number: ");
            scanf("%d", &position);
            printf("The node no. %d from the end is: ", position);
            nth_node_from_last(list1, position);
            break;
        case 16:
            printf("\nAll list elements are now unique and duplicated elements are deleted\n");
            del_duplicate(&list1);
            break;
        case 17:
            printf("\nList cleared!\n");
            empty_the_list(&list1);
            break;
        default:
            printf("\nQuit.\n");
        }
        printf("---------------------------\n");
    } while (choice >= 1 && choice <= 17);
    return 0;
}
void push(Node **start, int n)
{
    Node *temp = (Node *)malloc(sizeof(Node));
    temp->data = n;
    temp->next = NULL;
    if (!*start)
    {
        *start = temp;
        return;
    }
    Node *tempStart = *start;
    while (tempStart->next)
        tempStart = tempStart->next;
    tempStart->next = temp;
}
void traverse(Node *start)
{
    while (!isEmpty(start))
    {
        printf("%d->", start->data);
        start = start->next;
    }
    printf("NULL\n");
}
int isEmpty(Node *start)
{
    if (!start)
        return 1;
    return 0;
}
void insert_after(Node **start, int position, int value)
{
    Node *temp = (Node *)malloc(sizeof(Node));
    temp->data = value;
    temp->next = NULL;
    if (!*start)
    {
        printf("List is empty!\n");
        return;
    }
    Node *tempStart = *start;
    while (tempStart && tempStart->data != position)
    {
        tempStart = tempStart->next;
    }
    if (!tempStart)
    {
        printf("The element %d is not found!\n", position);
        return;
    }
    temp->next = tempStart->next;
    tempStart->next = temp;
}
void insert_before(Node **start, int position, int value)
{
    Node *temp = (Node *)malloc(sizeof(Node));
    temp->data = value;
    temp->next = NULL;
    if (!*start)
    {
        printf("List is empty!\n");
        return;
    }
    Node *tempNext = *start;
    Node *tempPrev = *start;
    while (tempNext && tempNext->data != position)
    {
        tempPrev = tempNext;
        tempNext = tempNext->next;
    }
    if (!tempNext)
    {
        printf("The element %d is not found!\n", position);
        return;
    }
    else if (tempNext == *start)
    {
        temp->next = *start;
        *start = temp;
        return;
    }
    temp->next = tempPrev->next;
    tempPrev->next = temp;
}
void delete_after(Node **start, int position)
{
    if (!*start)
    {
        printf("List is empty!\n");
        return;
    }
    Node *tempStart = *start;
    while (tempStart && tempStart->data != position)
    {
        tempStart = tempStart->next;
    }
    if (!tempStart || !tempStart->next)
    {
        printf("Element %d is not found or it does'nt have an after node!\n", position);
        return;
    }
    Node *ptr = tempStart->next;
    tempStart->next = tempStart->next->next;
    free(ptr);
}
void delete_before(Node **start, int value)
{
    if (!*start)
    {
        printf("List is empty!\n");
        return;
    }
    Node *tempNext = *start;
    Node *tempPrev = *start;
    while (tempNext->next && tempNext->next->data != value)
    {
        tempPrev = tempNext;
        tempNext = tempNext->next;
    }
    if (!tempNext->next)
    {
        printf("The element %d is not found or it does'nt have a before node!\n", value);
        return;
    }
    else if (tempNext == tempPrev)
    {
        *start = tempNext->next;
    }
    else
        tempPrev->next = tempNext->next;
    free(tempNext);
}
void insert_at(Node **start, int position, int value)
{
    Node *temp = (Node *)malloc(sizeof(Node));
    temp->data = value;
    temp->next = NULL;
    if (position == 0 || !*start)
    {
        temp->next = *start;
        *start = temp;
        return;
    }
    else if (position <= -1)
    {
        push(start, value);
        return;
    }
    Node *tempStart = *start;
    while (position > 1 && tempStart->next)
    {
        tempStart = tempStart->next;
        position--;
    }
    temp->next = tempStart->next;
    tempStart->next = temp;
}
void delete_at(Node **start, int position)
{
    if (!*start)
    {
        printf("The list is empty!\n");
        return;
    }
    struct Node *temp = *start;
    if (position == 0)
    {
        *start = temp->next;
        free(temp);
        return;
    }
    int mode = position;
    struct Node *ptr;
    while ((position > 1 || mode == -1) && temp->next)
    {
        ptr = temp;
        temp = temp->next;
        position--;
    }
    if (mode == -1)
    {
        ptr->next = temp->next;
        if (temp == *start)
            *start = NULL;
        free(temp);
        return;
    }
    else if (!temp->next || position < -1)
    {
        printf("Invalid position!\n");
        return;
    }
    ptr = temp->next;
    temp->next = ptr->next;
    free(ptr);
}
void delete_key(Node **start, int value)
{
    if (!*start)
    {
        printf("The list is empty!\n");
        return;
    }
    else if ((*start)->data == value)
    {
        Node *ptr = *start;
        *start = (*start)->next;
        free(ptr);
        return;
    }
    Node *tempStart = *start;
    Node *tempPrev = *start;
    while (tempStart && tempStart->data != value)
    {
        tempPrev = tempStart;
        tempStart = tempStart->next;
    }
    if (!tempStart)
    {
        printf("Key not found!\n");
        return;
    }
    tempPrev->next = tempStart->next;
    free(tempStart);
}
Node *search(Node *start, int value)
{
    if (!start)
        return NULL;
    Node *list = NULL;
    int position = 0;
    while (start)
    {
        if (start->data == value)
            push(&list, position);
        start = start->next;
        position++;
    }
    return list;
}
void empty_the_list(Node **start)
{
    while (*start)
    {
        Node *ptr = *start;
        *start = (*start)->next;
        free(ptr);
    }
}
void sort(Node **start)
{
    if (!*start)
        return;
    Node *ptr1 = *start;
    while (ptr1)
    {
        Node *ptr2 = ptr1->next;
        while (ptr2)
        {
            if (ptr1->data > ptr2->data)
            {
                int temp = ptr1->data;
                ptr1->data = ptr2->data;
                ptr2->data = temp;
            }
            ptr2 = ptr2->next;
        }
        ptr1 = ptr1->next;
    }
}
void print_in_rev(Node *start)
{
    if (!start)
    {
        printf("null<-");
        return;
    }
    print_in_rev(start->next);
    printf("%d<-", start->data);
}
void reverse_the_nodes(Node **start)
{
    if (!*start)
        return;
    Node *temp = *start;
    Node *temp1 = (*start)->next;
    Node *temp2;
    while (temp1 != NULL)
    {
        temp2 = temp1->next;
        temp1->next = temp;
        temp = temp1;
        temp1 = temp2;
    }
    (*start)->next = NULL;
    *start = temp;
}
void nth_node_from_last(Node *start, int n)
{
    if (!start)
        return;
    int count = 0;
    Node *tempStart = start;
    while (start)
    {
        count++;
        start = start->next;
    }
    if (count - n < 0 || n <= 0)
    {
        printf("The node is not possible!\n");
        return;
    }
    while (count - n)
    {
        count--;
        tempStart = tempStart->next;
    }
    printf("%d\n", tempStart->data);
}
void del_duplicate(Node **start)
{
    Node *tempStart = *start;
    int count_TS = 0;
    while (tempStart)
    {
        Node *nextPtr = tempStart->next;
        int count_NP = count_TS + 1;
        while (nextPtr)
        {
            if (tempStart->data == nextPtr->data)
            {
                if (!nextPtr->next)
                    nextPtr = NULL;
                delete_at(start, count_NP);
            }
            if (!nextPtr)
                break;
            nextPtr = nextPtr->next;
            count_NP++;
        }
        tempStart = tempStart->next;
        count_TS++;
    }
}

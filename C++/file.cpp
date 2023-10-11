#include<stdlib.h>
#include<string.h>
#include<stdio.h>
struct employee
{
    int id;
    char name[100];
    struct employee* next;
    
}* head;
void insertAfter(struct employee* prev_node, int new_id,char n[])
{
    if (prev_node == NULL)
    {
    printf("the given previous node cannot be NULL");    
    return;
    }
    struct employee* new_node =(struct employee*) malloc(sizeof(struct employee));
    new_node->id = new_id;
    strcpy(new_node->name,n);
    new_node->next = prev_node->next;
    prev_node->next = new_node;
}
int insert(int pos,int id,char n[])
{
    struct employee* temp=head;
    struct employee* emp = (struct employee*) malloc(sizeof(struct employee));
    emp->id =id;
    strcpy(emp->name,n);
    emp->next = NULL;
    if(pos==1)
    {
      temp=head;
      head=emp;
      head->next=temp;
    }
    else{
       while(pos!=1)
       { temp=temp->next;
       pos--;
       }
       insertAfter(temp,id,n);
    }
    return 0;
}

struct employee
 
    
    void print()
    {
        struct Node* temp = head;
        while (temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
    }
void disp()
{
    struct employee* temp=head;
    while(temp!=NULL){
       printf("id : %d , name : %s \n",temp->id,temp->name);
       temp=temp->next;
    }
    
}

int main()
{
    head = NULL;
    int choice;
    char name[100];
    int id;
    int pos;
    printf("1 to insert student details\n2 to delete student details\n3 to display all student details");
    do
    {   
        printf("\nEnter Choice: ");
        scanf("%d", &choice);
        switch (choice)
        {
            case 1:
                
                printf("enter the position : ");
                scanf("%d",&pos);
                printf("Enter id: ");
                scanf("%d", &id);
                printf("Enter name: ");
                scanf("%s", name);
                insert(pos,id,name);
                break;
            case 2:
                printf("Enter roll number to reverse: ");
                scanf("%d", &id);
                reverse(id);
                break;
            case 3:
                disp();
                break;
                case 4:
                print();
                break;
        }
        
    } while (choice != 0);
}
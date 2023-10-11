
#include<iostream>
#include<conio.h>
using namespace std;
struct node
        {
    int data;
    node *next;
        };
node * start=NULL;

node * createNode(int a)
{
    node *n1=new node();
    n1->data=a;
    n1->next=NULL;
    return n1;
}
void insertAtBeg(int a)                  // Function for inserting elements
{
    node *newNode=createNode(a);
    if(start==NULL)
        start=newNode;
    else
    {
        newNode->next=start;
        start=newNode;
    }
}
void display()                         //Function for displaying elements of LinkedList 
{

    cout<<"1st element of linked list deleted::";
    start=start->next;
    node *ptr=start;
    while(ptr!=NULL)
    {
        cout<<ptr->data<<" ";
        ptr=ptr->next;
    }
    cout<<endl;
}
int main()
{
    cout<<"Enter size of linkled list::";
    int n; cin>>n;
    cout<<"Enter list elemnts::";
    while (n)
    {
        int x; cin>>x;
        insertAtBeg(x); // we inserting element at begging every time
        n--;
    }
    display();
}

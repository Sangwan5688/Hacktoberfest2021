#include<iostream>
#include<vector>
using namespace std;

class node{
	public:
		int v;
		node *next;
		node(){
			next = NULL;
		}
};

class LinkedList{
	node *head;
	public:
		
		LinkedList(){
			head = NULL;
		}
		
		void insert_at_beginning(int v){
			node *temp = new node();
			temp->v = v;
			temp->next = head;
			head = temp;
		}
		
		void insert_at_end(int v){
			node *temp = new node();
			temp->v = v;
			if (head == NULL){
				// if linked list is empty
				// make temp the new head
				head = temp;
			}
			else{
				// if linked list is not empty
				// go to the last node of the linked list
				node *ptr = head;
				// the loop sets ptr to last node of the linked list
				while (ptr->next != NULL){
					ptr = ptr->next;
				}
				// ptr now points to the last node of the linked list
				// store temp in the next of ptr  
				ptr->next = temp;
			}
		}
		
		void insert_at_given_position(int v, int p){
			node *temp = new node();
			temp->v = v;
			if (p == 0){
				// if p==0 then insert temp at beginning
				temp->next = head;
				head = temp;
			}
			else{
				node *ptr = head;
				// the loop sets ptr to (p-1)th node
				while(p>1) {
					ptr = ptr->next;
					--p;
				}
				// ptr now points to (p-1)th node
				// insert temp between (p-1)th and pth node
				temp->next = ptr->next;
				ptr->next = temp;
			}
		}
		
		void delete_at_beginning(){
			if (head == NULL){
				cout<<"List is Empty"<<endl;
			}
			else{
				cout<<"Element Deleted: "<<head->v<<endl;
				// if linked list is not empty
				// store address of first node of the linked list in temp
				node *temp = head;
				// set second node as the new head of the linked list
				head = head->next;
				// free the old head
				delete(temp);
			}
		}
		
		void delete_at_end(){
			if (head == NULL){
				cout<<"List is Empty"<<endl;
			}
			else if (head->next == NULL){
				// if there's only 1 node in the linked list
				// free head and set it to NULL
				cout<<"Element Deleted: "<<head->v<<endl;
				delete(head);
				head = NULL;
			}
			else{
				// if there's more than 1 node in the linked
				// traverse to 2nd last node of the linked list
				node *temp = head;
				// the loop sets temp to 2nd last node of the linked list
				while (temp->next->next != NULL) {
					temp = temp->next;
				}
				// temp now points to the 2nd last node of the linked list
				cout<<"Element Deleted: "<<temp->next->v<<endl;
				// delete last node
				delete(temp->next);
				// set the next of 2nd last node to NULL
				temp->next = NULL;
			}					
		
		}
		
		void delete_at_given_position(int p){
			if (head == NULL){
				// if list is empty do nothing
				cout<<"List is Empty"<<endl;
			}
			else{
				node *temp, *ptr;
				if (p == 0) {
					// if p==0, perform delete at beginning
					cout<<"Element Deleted: "<<head->v<<endl;
					ptr = head;
					head = head->next;
					delete(ptr);
				}
				else{
					// if p > 0
					// set ptr to pth node and temp to (p-1)th node
					temp = ptr = head;
					while(p>0){
						--p;
						temp = ptr;
						ptr = ptr->next;
					}
					cout<<"Element Deleted: "<<ptr->v<<endl;
					// set next of (p-1)th node to next of pth node
					temp->next = ptr->next;
					// free pth node
					free(ptr);
				}
			}
		
		}
		
		void print(){
			if (head == NULL){
				cout<<"List is empty"<<endl;
			}
			else{
				node *temp = head;
				cout<<"Linked List: ";
				while (temp != NULL){
					cout<<temp->v<<"->";
					temp = temp->next;
				}
				cout<<"NULL"<<endl;
			}
		}	
			
};


int main() {
	
	printf("1 to Insert at the beginning");
	printf("\n2 to Insert at the end");
	printf("\n3 to Insert at mid");
	printf("\n4 to Delete from beginning");
	printf("\n5 to Delete from the end");
	printf("\n6 to Delete from mid");
	printf("\n7 to Display");
	printf("\n0 to Exit");
	
	int choice,v,p;
	LinkedList ll;
	do {
		cout<<"\nEnter Your Choice: ";
		cin>>choice;
		switch (choice)
		{
			case 1:
				cout<<"Enter Element: ";
				cin>>v;
				ll.insert_at_beginning(v);
				break;
				
			case 2:
				cout<<"Enter Element: ";
				cin>>v;
				ll.insert_at_end(v);
				break;
				
			case 3:
				cout<<"Enter Element: ";
				cin>>v;
				cout<<"Enter Position ( zero-indexed ): ";
				cin>>p;
				ll.insert_at_given_position(v,p);
				break;
				
			case 4:
				ll.delete_at_beginning();
				break;
				
			case 5:
				ll.delete_at_end();
				break;
				
			case 6:
				cout<<"Enter Position ( zero-indexed ): ";
				cin>>p;
				ll.delete_at_given_position(p);
				break;
				
			case 7:
				ll.print();
				break;
				
		}
	} while (choice != 0);
	
}
#include<bits/stdc++.h>
using namespace std;

struct Node{
	int data;
	Node* next;
	Node *prev;
};

Node *head=NULL, *tail=NULL;

void Add(Node *temp, Node *temp2){
	
	if(head == NULL){
		head = temp;
	}
	else if(temp2>)
	else{
			if(temp->data<= temp2->data){
					
			}
		}
	}
}





void Print(){
	Node *temp = head;
	cout<<"Linked List : ";
	while(temp){
		cout<<temp->data<<endl;
		temp = temp->next;
	}
}

int main(){
	cout<<"Enter Root element: ";
	int n;
	cin>>n;
	Add(n);
	int t=1;
	while(t){
		cout<<"What u want? \n1. Add Node \n2. InorderPrint\n";
		cin>>n;
		switch(n){
			case 1: {
				cout<<"enter data : ";
				cin>>n;
				Node *temp = new Node();
				temp->data = n;
				temp->prev = NULL;
				temp->next = NULL;
				Add(temp, head);
				break;
			}
			case 2: {
				cout<<Remove()<<endl;
				break;
			}
			case 3: {
				Print();
				break;
			}
		}
		cout<<"Want to enter more? ";
		cin>>t;
	}
}

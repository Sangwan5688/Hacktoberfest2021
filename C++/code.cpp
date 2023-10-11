#include<iostream>
using namespace std;
class node{
   public:
   int data;
   node *left;
   node *right;
   node(int val){
	   data=val;
	   left=NULL;
	   right=NULL;
   }
};
int ma(node *root){
	int sum=0;
	while(root!=NULL){
		sum=root->data;
		root=root->right;
	}

	return sum;
}
node * del(node *root, int x){
            if(root->data==x){
                      if(root->left==NULL and root->right==NULL)
                             return NULL;
					  else if(root->left==NULL)
					  return root->right;
					  else if(root->right==NULL)
					  return root->left;
					  else{
						int p= ma(root);
						root->data=p;
					    root->left=	del(root->left,p);	
					  return root;
					  }
					  
			}
else if(root->data>x)
  root->left=	del(root->left, x);
else if(root->data<x)
	root->right=del(root->right, x);
}
 int main(){
	node *root=new node(8);
	root->left=new node(3);
	root->right=new node(10);
	root->left->left=new node(1);
	root->left->right=new node(6);
	root->right->right=new node(14);
	del(root,14);
	
}
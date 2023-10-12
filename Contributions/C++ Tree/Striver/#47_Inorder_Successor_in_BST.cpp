/*
    TODO: Inorder Successor in BST
    ? https://leetcode.com/problems/inorder-successor-in-bst/
    ? https://practice.geeksforgeeks.org/problems/inorder-successor-in-bst/1
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution{
  public:
    Node *ans = nullptr;
    void pre(Node *root, Node *key) {
        if(root == nullptr) return;
        
        if(key->data >= root->data) {
            pre(root->right,key);
        } else {
            ans = root;
            pre(root->left,key);
        }
    }
    Node* inOrderSuccessor(Node *root, Node *x) {
        pre(root,x);
        return ans;
    }
};

//! Java
class Solution {
    public Node ans = null;
    public void pre(Node root, Node key) {
        if(root == null) return;
        
        if(key.data >= root.data) pre(root.right,key);
        else {
            ans = root;
            pre(root.left,key);
        }
    }
	public Node inorderSuccessor(Node root,Node x) {
        pre(root,x);
        return ans;
    }
}
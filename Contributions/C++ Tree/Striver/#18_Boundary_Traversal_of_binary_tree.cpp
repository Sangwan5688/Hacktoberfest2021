/*
    TODO: Boundary Traversal of binary tree
    ? https://leetcode.com/problems/boundary-of-binary-tree/
    ? https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    vector<int> in;
    bool isLeaf(Node *root) {
        return root->left == nullptr and root->right == nullptr;
    }
    void pre(Node *root) {
        if(isLeaf(root)) {
            in.push_back(root->data);
            return;
        }
        if(root->left) pre(root->left);
        if(root->right) pre(root->right);
    }
    vector <int> boundary(Node *root) {
        vector<int> ans, r;
        if(isLeaf(root)) {
            ans.push_back(root->data);
            return ans;
        }
        pre(root);
        Node* node = root;
        if(node->left) {
            while(isLeaf(node) == false) {
                ans.push_back(node->data);
                if(node->left) node = node->left;
                else node = node->right;
            }    
        } else ans.push_back(node->data);
        
        node = root;
        if(node->right) {
            node = node->right;
            while(isLeaf(node) == false) {
                r.push_back(node->data);
                if(node->right) node = node->right;
                else node = node->left;
            }
        }
        for(auto i : in) ans.push_back(i);
        reverse(r.begin(),r.end());
        for(auto i : r) ans.push_back(i);
        return ans;
    }
};

//! Java
class Solution {
    public ArrayList<Integer> in = new ArrayList<>();
    public boolean isLeaf(Node node) { return node.left == null && node.right == null; }
    public void pre(Node root) {
        if(isLeaf(root)) {
            in.add(root.data);
            return;
        }
        if(root.left != null) pre(root.left);
        if(root.right != null) pre(root.right);
    }
	ArrayList<Integer> boundary(Node root) {
	    ArrayList<Integer> ans = new ArrayList<>(), r = new ArrayList<>();
	    if(isLeaf(root)) {
	        ans.add(root.data);
	        return ans;
	    }
	    pre(root);
	    Node node = root;
	    if(node.left != null) {
	        while(isLeaf(node) == false) {
	            ans.add(node.data);
	            if(node.left != null) node = node.left;
	            else node = node.right;
	        }
	    } else ans.add(node.data);
	    
	    node = root;
	    if(node.right != null) {
	        node = node.right;
	        while(isLeaf(node) == false) {
	            r.add(node.data);
	            if(node.right != null) node = node.right;
	            else node = node.left;
	        }
	    }
	    
	    for(Integer it : in) ans.add(it);
	    Collections.reverse(r);
	    for(Integer it : r) ans.add(it);
	    return ans;
	}
}

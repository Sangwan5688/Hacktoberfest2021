/*
    TODO: Children Sum Property 
    ? https://www.codingninjas.com/codestudio/problems/childrensumproperty_790723
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
bool isLeaf(BinaryTreeNode<int> *root) {
    return (root->left == nullptr) and (root->right == nullptr);
}
int pre(BinaryTreeNode<int>* root) {
    if(isLeaf(root)) return root->data;
    
    int left = 0, right = 0;
    if(root->left) left = root->left->data;
    if(root->right) right = root->right->data;

    if(left + right < root->data) {
        if(root->left) root->left->data = root->data;
        if(root->right) root->right->data = root->data;
    } else {
        root->data = right + left;
    }

    if(root->left) 
        left = pre(root->left);
    if(root->right) 
        right = pre(root->right);

    if(left + right > root->data) root->data = left + right;
    return root->data;
}

void changeTree(BinaryTreeNode < int > * root) {
    if(root != nullptr) pre(root);
}  

//! Java
public class Solution {
    public static boolean isLeaf(BinaryTreeNode<Integer> root) {
        return (root.left == null) && (root.right == null);
    }
    public static int pre(BinaryTreeNode<Integer> root) {
        if(isLeaf(root)) return root.data;
        
        int left = 0, right = 0;
        if(root.left != null) left = root.left.data;
        if(root.right != null) right = root.right.data;

        if(left + right < root.data) {
            if(root.left != null) root.left.data = root.data;
            if(root.right != null) root.right.data = root.data;
        } else {
            root.data = right + left;
        }

        if(root.left != null) 
            left = pre(root.left);
        if(root.right != null) 
            right = pre(root.right);

        if(left + right > root.data) root.data = left + right;
        return root.data;
    }
    public static void changeTree(BinaryTreeNode < Integer > root) {
        if(root != null) pre(root);
    }
}
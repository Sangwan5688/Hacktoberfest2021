/*
    TODO: Ceil from BST 
    ? https://www.codingninjas.com/codestudio/problems/ceil-from-bst_920464
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
int ans = -1;
void pre(BinaryTreeNode<int> *node, int x) {
    if(node == nullptr) return;
    if(x <= node->data) {
        ans = node->data; 
        pre(node->left,x);
    } else {
        pre(node->right,x);
    }
}
int findCeil(BinaryTreeNode<int> *node, int x){
    ans = -1;
    pre(node,x);
    return ans;
}

//! Java
public class Solution {
    public static int ans = -1;
    public static void pre(TreeNode<Integer> node, int x) {
        if(node == null) return;
        if(x <= node.data) {
            ans = node.data; 
            pre(node.left,x);
        } else pre(node.right,x);
    }
    public static int findCeil(TreeNode<Integer> node, int x) {
        ans = -1;
        pre(node,x);
        return ans;
    }
}

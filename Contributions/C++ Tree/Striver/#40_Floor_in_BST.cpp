/*
    TODO: Floor in BST 
    ? https://www.codingninjas.com/codestudio/problems/floor-from-bst_920457
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
int ans = -1;
void pre(TreeNode<int> *node, int x) {
    if(node == nullptr) return;
    if(x < node->val) {
        pre(node->left,x);
    } else {
        ans = node->val;
        pre(node->right,x);
    }
}
int floorInBST(TreeNode<int> * root, int x) {
    ans = -1;
    pre(root,x);
    return ans;
}

//! Java
public class Solution {
    public static int ans = -1;
    public static void pre(TreeNode<Integer> node, int x) {
        if(node == null) return;
        if(x < node.data) {
            pre(node.left,x);
        } else {
            ans = node.data;
            pre(node.right,x);
        }
    }
    public static int floorInBST(TreeNode<Integer> root, int x) {
        ans = -1;
        pre(root,x);
        return ans;
    }
}
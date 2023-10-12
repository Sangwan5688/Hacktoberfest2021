/*
    TODO: Symmetric Tree
    ? https://leetcode.com/problems/symmetric-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    bool same(TreeNode* p, TreeNode* q) {
        if(p == nullptr or q == nullptr) return (p == q);
        return p->val == q->val and same(p->left,q->right) and same(p->right, q->left);
    }
    bool isSymmetric(TreeNode* root) {
        if(root == nullptr) return true;
        return same(root->left,root->right);
    }
};

//! Java
class Solution {
    public boolean same(TreeNode p, TreeNode q) {
        if(p == null || q == null) return (p == q);
        return p.val == q.val && same(p.left,q.right) && same(p.right,q.left);
    }
    public boolean isSymmetric(TreeNode root) {
        if(root == null) return true;
        return same(root.left,root.right);        
    }
}
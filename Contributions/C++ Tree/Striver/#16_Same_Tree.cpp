/*
    TODO: Same Tree
    ? https://leetcode.com/problems/same-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(p == nullptr or q == nullptr) return (p == q);
        return p->val == q->val and isSameTree(p->left,q->left) and isSameTree(p->right,q->right);
    }
};

//! Java
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p == null || q == null) return (p == q);
        return (p.val == q.val) && isSameTree(p.left,q.left) && isSameTree(p.right,q.right);
    }
}
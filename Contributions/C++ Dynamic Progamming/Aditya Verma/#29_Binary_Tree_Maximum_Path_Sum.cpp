/*
    TODO: Binary Tree Maximum Path Sum
    ? https://leetcode.com/problems/binary-tree-maximum-path-sum/
*/

#include "bits/stdc++.h"
using namespace std;

class Solution {
public:
    int maxi = -1e9;
    int pre(TreeNode* root) {
        if(root == nullptr) return 0;

        int l = 0, r = 0;
        if(root->left) l = pre(root->left);
        if(root->right) r = pre(root->right);
        
        maxi = max(maxi, root->val + l + r);
        maxi = max(maxi, root->val + max(l,r));
        maxi = max(maxi, root->val);
        if(root->val > 0 and max(l,r) < 0) return root->val;
        return root->val + max(l,r);
    }
    int maxPathSum(TreeNode* root) {
        pre(root);
        return maxi;
    }
};
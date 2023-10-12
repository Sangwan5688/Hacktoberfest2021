/*
    TODO: Construct Binary Tree from Preorder and Postorder Traversal
    ? https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    map<int,int> mp;
    TreeNode* constructFromPrePost(vector<int>& preorder, vector<int>& postorder) {
        for(int i=0;i<postorder.size();i++) mp[postorder[i]] = i;
        return pre(0,preorder.size()-1,0,postorder.size()-1,preorder,postorder);
    }
    TreeNode* pre(int pres, int pree, int poss, int pose, vector<int>& preorder, vector<int>& postorder) {
        if(pres > pree or poss > pose) return nullptr;
        TreeNode* root = new TreeNode(preorder[pres]);

        if(pres == pree) return root; // !!! IMP

        int ind = mp[preorder[pres+1]];
        int len = ind - poss + 1;
        cout<<ind<<" "<<len<<endl;

        root->left = pre(pres+1,pres+len,poss,ind,preorder,postorder);
        root->right = pre(pres+len+1,pree,ind+1,pose-1,preorder,postorder);
        return root;
    }
};

//! Java

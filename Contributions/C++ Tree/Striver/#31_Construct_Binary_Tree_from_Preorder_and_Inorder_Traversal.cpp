/*
    TODO: Construct Binary Tree from Preorder and Inorder Traversal
    ? https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    map<int,int> mp;
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for(int i=0;i<inorder.size();i++) mp[inorder[i]] = i;
        return check(0,preorder.size()-1,0,inorder.size()-1,preorder,inorder);
    }
    TreeNode* check(int pres, int pree, int ins, int ine, vector<int>& preorder, vector<int>& inorder) {
        if(pres > pree or ins > ine) return nullptr;
        TreeNode* root = new TreeNode(preorder[pres]);
        int len = mp[preorder[pres]] - ins;
        int ind = mp[preorder[pres]];
        root->left = check(pres+1,pres+len,ins,ind-1,preorder,inorder);
        root->right = check(pres+len+1,pree,ind+1,ine,preorder,inorder);
        return root;
    }
};

//! Java
class Solution {
    public Map<Integer,Integer> mp = new HashMap<>();
    public TreeNode check(int pres, int pree, int ins, int ine, int[] preorder, int[] inorder) {
        if(pres > pree || ins > ine) return null;
        TreeNode root = new TreeNode(preorder[pres]);
        int len = mp.get(preorder[pres]) - ins;
        int ind = mp.get(preorder[pres]);
        root.left = check(pres+1,pres+len,ins,ind-1,preorder,inorder);
        root.right = check(pres+len+1,pree,ind+1,ine,preorder,inorder);
        return root;
    }
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        for(int i=0;i<inorder.length;i++) mp.put(inorder[i], i);
        return check(0,preorder.length-1,0,inorder.length-1,preorder,inorder);
    }
}
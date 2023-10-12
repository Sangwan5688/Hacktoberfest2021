/*
    TODO: Construct Binary Tree from Inorder and Postorder Traversal
    ? https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    map<int,int> mp;
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for(int i=0;i<inorder.size();i++) mp[inorder[i]] = i;
        return check(0,inorder.size()-1,0,postorder.size()-1,inorder,postorder);
    }
    TreeNode* check(int ins, int ine, int pos, int poe, vector<int>& inorder, 
        vector<int>& postorder) {
        if(ins > ine or pos > poe) return nullptr;
        TreeNode* root = new TreeNode(postorder[poe]);
        int len = mp[postorder[poe]] - ins;
        int ind = mp[postorder[poe]];
        root->left = check(ins,ind-1,pos,pos+len-1,inorder,postorder);
        root->right = check(ind+1,ine,pos+len,poe-1,inorder,postorder);
        return root;
    }
};

//! Java
class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        Map<Integer,Integer> mp = new HashMap<>();
        for(int i=0;i<inorder.length;i++) {
            mp.put(inorder[i], i);
        }
        return make(0,inorder.length-1,0,postorder.length-1,inorder,postorder,mp);
    }
    TreeNode make(int InS, int InE, int PoS, int PoE, int[] inorder, int[] postorder, Map<Integer,Integer> mp) {
        if(InS > InE || PoS > PoE) return null;
        TreeNode root = new TreeNode(postorder[PoE]);
        int index = mp.get(postorder[PoE]);
        int len = mp.get(postorder[PoE]) - InS;
        root.left = make(InS,index-1,PoS,PoS+len-1,inorder,postorder,mp);
        root.right = make(index+1,InE,PoS+len,PoE-1,inorder,postorder,mp);
        return root;
    }
}
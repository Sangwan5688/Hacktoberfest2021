/*
    TODO: Construct Binary Search Tree from Preorder Traversal
    ? https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Solution {
public:
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        int i=0;
        return build(preorder,i,INT_MAX);        
    }
    TreeNode* build(vector<int>& preorder, int& i, int maxi) {
        if(i == preorder.size() or preorder[i] > maxi) return nullptr;
        TreeNode* root = new TreeNode(preorder[i++]);
        root->left = build(preorder,i,root->val);
        root->right = build(preorder,i,maxi);
        return root;
    }
};

class Solution {
public:
    map<int,int> mp;
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        vector<int> inorder = preorder;
        sort(inorder.begin(),inorder.end());
        return make(inorder,preorder);
    }
    TreeNode* make(vector<int>& inorder, vector<int>& preorder) {
        for(int i=0;i<inorder.size();i++) mp[inorder[i]] = i;
        return prev(0,inorder.size()-1,0,preorder.size()-1,inorder,preorder);
    }
    TreeNode* prev(int ins, int ine, int prs, int pre, vector<int>& inorder, vector<int>& preorder) {
        if(ins > ine or prs > pre) return nullptr;
        TreeNode* root = new TreeNode(preorder[prs]);
        int ind = mp[preorder[prs]];
        int len = ind - ins;
        root->left = prev(ins,ind-1,prs+1,prs+len,inorder,preorder);
        root->right = prev(ind+1,ine,prs+len+1,pre,inorder,preorder);
        return root;
    }
};

//! Java
class Solution {
    public TreeNode bstFromPreorder(int[] preorder) {
        return build(preorder, new int[]{0}, Integer.MAX_VALUE);
    }
    public TreeNode build(int[] preorder, int[] i, int maxi) {
        if(i[0] == preorder.length || preorder[i[0]] > maxi) return null;
        TreeNode root = new TreeNode(preorder[i[0]++]);
        root.left = build(preorder,i,root.val);
        root.right = build(preorder,i,maxi);
        return root;
    }
}

class Solution {
    public Map<Integer,Integer> mp = new HashMap<>();
    public TreeNode bstFromPreorder(int[] preorder) {
        int[] inorder = Arrays.copyOf(preorder, preorder.length);
        Arrays.sort(inorder);
        return make(inorder,preorder);
    }
    public TreeNode make(int[] inorder, int[] preorder) {
        for(int i=0;i<inorder.length;i++) mp.put(inorder[i], i);
        return prev(0,inorder.length-1,0,preorder.length-1,inorder,preorder);
    }
    TreeNode prev(int ins, int ine, int prs, int pre, int[] inorder, int[] preorder) {
        if(ins > ine || prs > pre) return null;
        TreeNode root = new TreeNode(preorder[prs]);
        int ind = mp.get(preorder[prs]);
        int len = ind - ins;
        root.left = prev(ins,ind-1,prs+1,prs+len,inorder,preorder);
        root.right = prev(ind+1,ine,prs+len+1,pre,inorder,preorder);
        return root;
    }
}
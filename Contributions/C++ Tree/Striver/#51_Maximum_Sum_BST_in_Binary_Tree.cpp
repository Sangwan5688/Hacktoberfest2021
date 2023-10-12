/*
    TODO: Maximum Sum BST in Binary Tree
    ? https://practice.geeksforgeeks.org/problems/largest-bst/1
    ?https://leetcode.com/problems/largest-bst-subtree/
    ! right & left must be pre computed before going to node
    ! similar
    ? https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Pair {
public:
    int size = 0, mini = 0, maxi = 0;
    Pair() : size(0), mini(1e9), maxi(-1e9) {}
    Pair(int sz, int mini, int maxi) : size(sz), mini(mini), maxi(maxi) {}
};

class Solution {
public:
    bool isLeaf(Node *root) {
        return root->left == nullptr and root->right == nullptr;
    }
    Pair* pre(Node *root) {
        if(root == nullptr) return new Pair();
        
        Pair *left = pre(root->left);
        Pair *right = pre(root->right);
        
        if(left->maxi < root->data and root->data < right->mini) 
            return new Pair(1 + left->size + right->size, min(root->data,
                left->mini),max(root->data,right->maxi));
        else return new Pair(max(left->size,right->size),-1e9,1e9);
    }
    int largestBst(Node *root) {
         return pre(root)->size;
    }
};

//! Java
class Pair {
    public int size = 0, mini = 0, maxi = 0;
    public Pair() {
        this.size = 0;
        this.mini = (int)1e9;
        this.maxi = (int)-1e9;
    }
    public Pair(int sz, int mini, int maxi) {
        this.size = sz;
        this.mini = mini;
        this.maxi = maxi;
    }
}

class Solution{
    public static boolean isLeaf(Node root) { 
        return root.left == null && root.right == null;
    }
    public static Pair pre(Node root) {
        if(root == null) return new Pair();
        
        Pair left = pre(root.left);
        Pair right = pre(root.right);
        
        if(left.maxi < root.data && root.data < right.mini) 
            return new Pair(1 + left.size + right.size, Math.min(root.data,
                left.mini),Math.max(root.data,right.maxi));
        else return new Pair(Math.max(left.size,right.size),(int)-1e9,(int)1e9);
    }
    static int largestBst(Node root) {
        return pre(root).size;
    }
}
/*
    TODO: Two Sum IV - Input is a BST
    ? https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class RBSTIterator {
public:
    TreeNode* root;
    stack<TreeNode*> st;
    RBSTIterator(TreeNode* root) {
        this->root = root;
        while(root) {
            st.push(root);
            root = root->right;
        }
    }
    
    int next() {
        root = st.top();
        st.pop();
        int no = root->val;
        if(root->left) {
            root = root->left;
            while(root) {
                st.push(root);
                // cout<<root->val<<endl;
                root = root->right;
            }
            // cout<<endl;
        }
        return no;
    }
    
    bool hasNext() {
        return (st.size() >= 1);
    }
};

class BSTIterator {
public:
    TreeNode* root;
    stack<TreeNode*> st;
    BSTIterator(TreeNode* root) {
        this->root = root;
        while(root) {
            st.push(root);
            root = root->left;
        }
    }
    
    int next() {
        root = st.top();
        st.pop();
        int no = root->val;
        if(root->right) {
            root = root->right;
            while(root) {
                st.push(root);
                // cout<<root->val<<endl;
                root = root->left;
            }
            // cout<<endl;
        }
        return no;
    }
    
    bool hasNext() {
        return (st.size() >= 1);
    }
};

class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        BSTIterator it1(root);
        RBSTIterator it2(root);
        int num1 = it1.next(), num2 = it2.next();
        while(num1 < num2) {
            int target = num1 + num2;
            cout<<num1<<" "<<num2<<endl;
            if(k == target) return true;
            else if(target < k) {
                if(it1.hasNext()) {
                    num1 = it1.next();
                } else break;
            } else {
                if(it2.hasNext()) {
                    num2 = it2.next();
                } else break;
            }
        }
        return false;
    }
};


//! Java
class RBSTIterator {
    public TreeNode root = null;
    public Stack<TreeNode> st = new Stack<>();
    public RBSTIterator(TreeNode root) {
        this.root = root;
        while(root != null) {
            st.push(root);
            root = root.right;
        }
    }
    public int next() {
        root = st.peek();
        st.pop();
        int no = root.val;
        if(root.left != null) {
            root = root.left;
            while(root != null) {
                st.push(root);
                root = root.right;
            }
        }
        return no;
    }
    public boolean hasNext() {
        return (st.size() >= 1);
    }
}

class BSTIterator {
    public TreeNode root = null;
    public Stack<TreeNode> st = new Stack<>();
    public BSTIterator(TreeNode root) {
        this.root = root;
        while(root != null) {
            st.push(root);
            root = root.left;
        }
    }
    public int next() {
        root = st.peek();
        st.pop();
        int no = root.val;
        if(root.right != null) {
            root = root.right;
            while(root != null) {
                st.push(root);
                root = root.left;
            }
        }
        return no;
    }
    public boolean hasNext() {
        return (st.size() >= 1);
    }
}

class Solution {
    public boolean findTarget(TreeNode root, int k) {
        BSTIterator it1 = new BSTIterator(root);
        RBSTIterator it2 = new RBSTIterator(root);
        int num1 = 0, num2 = 0;
        if(it1.hasNext()) num1 = it1.next();
        if(it2.hasNext()) num2 = it2.next();
        while(num1 < num2) {
            int target = num1 + num2;
            // System.out.println(num1 + " " + num2);
            // cout<<target<<endl;
            if(k == target) return true;
            else if(target < k) {
                if(it1.hasNext()) {
                    num1 = it1.next();
                } else break;
            } else {
                if(it2.hasNext()) {
                    num2 = it2.next();
                } else break;
            }
            // System.out.println(num1 + " " + num2);
        }
        return false;
    }
}

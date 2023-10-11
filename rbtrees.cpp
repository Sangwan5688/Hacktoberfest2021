#include <bits/stdc++.h>
using namespace std;

class Node
{
    int data;
    string color;
    Node *left, *right, *parent;

    Node(int data)
    {
        this->data = data;
        color = 1; // 1 denoting red
        left = NULL;
        right = NULL;
        parent = NULL;
    }
    Node *root = NULL;
    Node *insertBST(Node *root, Node *node)
    {
        if (!root)
        {
            return node;
        }
        if (node->data < root->data)
        {
            root->left = insertBST(root->left, node);
            root->left->parent = root;
        }
        else if (node->data > root->data)
        {
            root->right = insertBST(root->right, node);
            root->right->parent = root;
        }

        return root;
    }

    void insertValue(Node *root, int data)
    {
        Node *node = new Node(data);
        root = insertBST(root, node);
        fixInsertRBTree(node);
    }

    void fixInsertRBTree(Node *node)
    {
        Node *parent = NULL;
        Node *grandParent = NULL;
    }
    int blackHeight(Node *root)
    {
        int ht = 0;

        while (root)
        {
            if (root->color == 0)
            {
                ht++;
                root = root->left;
            }
        }
        return ht;
    }
}

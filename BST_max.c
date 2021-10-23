#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left, *right;
};

struct Node* newNode(int data)
{
    struct Node* temp = malloc(sizeof(struct Node));
    temp->data = data;
    temp->right = temp->left = NULL;
    return temp;
}

struct Node* KthLargestUsingMorrisTraversal(struct Node* root, int k)
{
    struct Node* curr = root;
    struct Node* Klargest = NULL;

    int count = 0;

    while (curr != NULL) {
        if (curr->right == NULL) {

            if (++count == k)
                Klargest = curr;

            curr = curr->left;
        }

        else {

            struct Node* succ = curr->right;

            while (succ->left != NULL && succ->left != curr)
                succ = succ->left;

            if (succ->left == NULL) {

                succ->left = curr;

                curr = curr->right;
            }

            else {

                succ->left = NULL;

                if (++count == k)
                    Klargest = curr;

                curr = curr->left;
            }
        }
    }

    return Klargest;
}

int main()
{
    /* Constructed binary tree is
          4
        /   \
       2     7
     /  \   /  \
    1    3  6    10 */

    struct Node* root = newNode(4);
    root->left = newNode(2);
    root->right = newNode(7);
    root->left->left = newNode(1);
    root->left->right = newNode(3);
    root->right->left = newNode(6);
    root->right->right = newNode(10);

    printf("Finding K-th largest Node in BST : %d\n", KthLargestUsingMorrisTraversal(root, 3)->data);

    return 0;
}

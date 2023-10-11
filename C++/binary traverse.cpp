

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

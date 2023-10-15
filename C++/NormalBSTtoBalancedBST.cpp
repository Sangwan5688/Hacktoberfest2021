class Solution
{
    public:
    // Function to store all nodes of the BST in a vector
    void storeBSTNodes(Node* root, vector<Node*> &nodes)
    {
        // If root is NULL, return
        if (root == NULL)
            return;
        
        // Recursively store left subtree nodes
        storeBSTNodes(root->left, nodes);
        
        // Push current node to the vector
        nodes.push_back(root);
        
        // Recursively store right subtree nodes
        storeBSTNodes(root->right, nodes);
    }
    
    // Function to build a balanced BST from a sorted vector of nodes
    Node* buildTreeUtil(vector<Node*> &nodes, int start, int end)
    {
        // If start index is greater than end index, return NULL
        if (start > end)
            return NULL;
        
        // Find the middle index
        int mid = (start + end) / 2;
        
        // Create a new root node with the middle node of the vector
        Node *root = nodes[mid];
        
        // Recursively build left subtree using nodes before mid
        root->left = buildTreeUtil(nodes, start, mid - 1);
        
        // Recursively build right subtree using nodes after mid
        root->right = buildTreeUtil(nodes, mid + 1, end);
        
        return root;
    }
    
    // Function to build a balanced BST from an unbalanced BST
    Node* buildBalancedTree(Node* root)
    {
        // Create an empty vector to store nodes
        vector<Node *> nodes;
        
        // Store all nodes of the BST in the vector
        storeBSTNodes(root, nodes);
        
        // Get the size of the vector
        int n = nodes.size();
        
        // Build a balanced BST from the sorted vector of nodes
        return buildTreeUtil(nodes, 0, n - 1);
    }
};

class Solution {

public:
    void inorder(Node* node, vector<int>& v)
    {
        if (node == NULL)
            return;
        inorder(node->left, v);
        v.push_back(node->data);
        inorder(node->right, v);
    }

    int floor(Node* root, int x)
    {
        // Your code goes here
        vector<int> ans;
        inorder(root, ans);
        reverse(ans.begin(), ans.end());
        for (int i = 0; i < ans.size(); i++) {
            if (ans[i] <= x) {
                return ans[i];
            }
        }
        return -1;
    }
};

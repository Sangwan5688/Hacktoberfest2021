class Solution {
public:
    // Function to find the nodes that are common in both
    // BST.
    set<int> st;
    vector<int> ans;

    void dfs(Node* root)
    {
        if (!root) {
            return;
        }
        st.insert(root->data);
        dfs(root->left);
        dfs(root->right);
    }

    void dfs2(Node* root)
    {
        if (!root) {
            return;
        }
        if (st.find(root->data) != st.end())
            ans.push_back(root->data);
        dfs2(root->left);
        dfs2(root->right);
    }

    vector<int> findCommon(Node* root1, Node* root2)
    {
        dfs(root1);
        dfs2(root2);
        sort(ans.begin(), ans.end());
        return ans;
    }
};

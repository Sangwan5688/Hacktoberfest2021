/*
    TODO: Serialize and Deserialize Binary Tree
    ? https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
*/

#include "bits/stdc++.h"
using namespace std;

//! C++
class Codec {
public:
    string toStr(int n) {
        if(n == 0) return "0";
        string ans = "";
        bool flag = false;
        if(n < 0) {
            flag = true;
            n = 0 - n;
        }

        while(n) {
            ans.push_back(n%10 + '0');
            n /= 10;
        }

        reverse(ans.begin(),ans.end());
        if(flag) ans.insert(ans.begin(),'-');
        return ans;
    }
    int toNum(string data) {
        if(data == "0") return 0;
        bool flag = false;
        if(data.front() == '-') flag = true, data.erase(data.begin());
        
        int no = 0;
        for(auto i : data) no = no*10 + (i - '0');

        if(flag) return -no;
        else return no;
    }
    string serialize(TreeNode* root) {
        if(root == nullptr) return "";
        string data = "";
        queue<TreeNode*> q;
        q.push(root);

        while(!q.empty()) {
            TreeNode* node = q.front();
            q.pop();

            if(node == nullptr) {
                data += "# ";
                continue;
            } else data += toStr(node->val)+ " ";

            q.push(node->left);
            q.push(node->right);
        }

        return data;
    }
    TreeNode* deserialize(string data) {
        if(data == "") return nullptr;
        string word = "";
        stringstream sso(data);
        sso >> word;
        TreeNode* root = new TreeNode(toNum(word)), *head = root;

        int ind = 0, cnt = 0;
        vector<TreeNode*> st;
        st.push_back(root);
        while (sso >> word) {
            TreeNode* temp = nullptr;
            if(word != "#") temp = new TreeNode(toNum(word));

            cnt++;
            if(cnt&1 and temp != nullptr) st[ind]->left = temp;
            else if(cnt%2 == 0 and temp != nullptr) st[ind]->right = temp;

            if(cnt%2 == 0) ind++;

            if(temp != nullptr) st.push_back(temp);
        }
        return head;
    }
};

//! Java

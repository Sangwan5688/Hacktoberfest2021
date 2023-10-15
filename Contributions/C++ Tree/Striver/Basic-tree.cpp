#include "bits/stdc++.h"
using namespace std;

// Binary Tree Representation in c++
    struct TreeNode{
        int val;
        TreeNode *left;
        TreeNode *right;

        TreeNode() : val(0), left(nullptr), right(nullptr) {}
        TreeNode(int data) : val(data), left(nullptr), right(nullptr) {}
        TreeNode(int data,TreeNode *left,TreeNode *right) : val(data), left(left), right(right) {}
    };

/* Binary Tree Representation in java 
    public class TreeNode{
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode() {}
        TreeNode(int data) {
            this.val = data;
        }
        TreeNode(int data,TreeNode left,TreeNode right) {
            this.val = data;
            this.left = left;
            this.right = right;
        }
    } */
/* Binary Tree Preorder Traversal */
    class Solution {
    public:
        vector<int> preorder;
        vector<int> preorderTraversal(TreeNode* root) {
            // preorder - root left right
            if(root == NULL) return preorder;
            if(root) preorder.push_back(root->val);
            if(root->left) preorderTraversal(root->left);
            if(root->right) preorderTraversal(root->right);
            return preorder;
        }
    };

/* Binary Tree Inorder Traversal */
    class Solution {
    public:
        vector<int> inorder;
        vector<int> inorderTraversal(TreeNode* root) {
            if(root == nullptr) return inorder;
            if(root->left) inorderTraversal(root->left);
            if(root) inorder.push_back(root->val);
            if(root->right) inorderTraversal(root->right);
            return inorder;
        }
    };

/* Binary Tree postorder Traversal */
    class Solution {
    public:
        vector<int> postorder;
        vector<int> postorderTraversal(TreeNode* root) {
            if(root == nullptr) return postorder;
            if(root->left) postorderTraversal(root->left);
            if(root->right) postorderTraversal(root->right);
            if(root) postorder.push_back(root->val);
            return postorder;
        }
    };

/* Binary Tree Level Order Traversal */
    class Solution {
    public:
        vector<vector<int>> levelOrder(TreeNode* root) {
            queue<TreeNode*> q;
            q.push(root);
            vector<vector<int>> ans;
            
            if(root == nullptr) return ans;
            while(!q.empty()){
                vector<int> temp;
                vector<TreeNode*> v1;
                
                while(!q.empty()){
                    TreeNode* root1 = q.front();    
                    q.pop();
                    temp.push_back(root1->val);
                    if(root1->left) v1.push_back(root1->left);
                    if(root1->right) v1.push_back(root1->right);
                }
                
                ans.push_back(temp);
                for(auto i : v1) q.push(i);
                
            }
            return ans;
        }
    };

    class Solution {
    public:
        vector<vector<int>> levelOrder(TreeNode* root) {
            vector<vector<int>> ans;
            if(root == NULL) return ans;
            queue<TreeNode*> q;
            q.push(root);
            while(!q.empty()){
                vector<int> level;
                int size = q.size();
                for(int i=0;i<size;i++){
                    TreeNode* node = q.front();
                    q.pop();
                    if(node->left) q.push(node->left);
                    if(node->right) q.push(node->right);
                    level.push_back(node->val);
                }
                ans.push_back(level);
            }
            return ans;
        }
    };

/* Iterative method for Preorder Traversal of Binary Tree 
    1. concept preorder - root left right => root right left */
    class Solution {
    public:
        vector<int> preorderTraversal(TreeNode* root) {
            vector<int> ans;
            if(root == nullptr) return ans;
            
            stack<TreeNode*> st;
            st.push(root);
            while(!st.empty()){
                TreeNode* node = st.top();
                st.pop();
                ans.push_back(node->val);
                if(node->right) st.push(node->right);
                if(node->left) st.push(node->left);
            }
            
            return ans;
        }
    };

/* Iterative method for Binary Tree Preorder Traversal */
    class Solution {
    public:
        vector<int> inorderTraversal(TreeNode* root) {
            vector<int> inorder;
            if(root == nullptr) return inorder;

            stack<TreeNode*> st;
            
            TreeNode* node = root;
            
            while(true){
                if(node != NULL){
                    st.push(node);
                    node = node->left;
                }else{
                    if(st.empty() == true) break;
                    node = st.top();
                    st.pop();
                    inorder.push_back(node->val);
                    node = node->right;
                }
            }
            
            return inorder;
        }
    };

/* Iterative method for Binary Tree Postorder Traversal using 2 stack */
    class Solution {
    public:
        vector<int> postorderTraversal(TreeNode* root) {
            stack<TreeNode*> st1,st2;
            vector<int> postorder;
            
            if(root == nullptr) return postorder;
            st1.push(root);
            
            while(!st1.empty()){
                TreeNode* node = st1.top();
                st2.push(node);
                st1.pop();
                if(st2.top()->left) st1.push(st2.top()->left);
                if(st2.top()->right) st1.push(st2.top()->right);
            }
            
            while(!st2.empty()){
                postorder.push_back(st2.top()->val);
                st2.pop();
            }
            
            return postorder;
        }
    };

/* Iterative method for Binary Tree Postorder Traversal using 1 stack 🔺 */
/* Preorder, Inorder, and Postorder Traversal in one Traversal 🔺 */
/* Height of Binary Tree or Maximum Depth of Binary Tree */
  class Solution {
  public:
      int maxDepth(TreeNode* root) {
          if(root == nullptr) return 0;
          int left = maxDepth(root->left);
          int right = maxDepth(root->right);
          return 1 + max(left,right);
      }
  };
/* Balanced Binary Tree */
    class Solution {
    public:
        bool isBalanced(TreeNode* root) {
            if(common(root) == -1) return false;
            return true;
        }
        int common(TreeNode* root){
            if(root == nullptr) return 0;
            int lh = common(root->left);
            int rh = common(root->right);
            
            if(lh == -1 or rh == -1) return -1;
            if(abs(lh-rh) > 1) return -1;
            
            return 1 + max(lh,rh);
        }
    };
/* Diameter of Binary Tree */
  class Solution {
  public:
      int diameterOfBinaryTree(TreeNode* root) {
          int maxi = INT_MIN;
          maxDiameter(root,maxi);
          return maxi;
      }
      int maxDiameter(TreeNode* root,int & maxi){
          if(root == nullptr) return 0;
          int lh = maxDiameter(root->left,maxi);
          int rh = maxDiameter(root->right,maxi);
          
          if(maxi < abs(lh + rh)) maxi = lh + rh;
          
          return 1 + max(lh,rh);
      }
  };
/* Binary Tree Maximum Path Sum */
  // 1. taking maxi value wrong 
      // max(maxi, root->val + max(lh,rh)) => max(maxi, root->val + lh + rh)
  // 2. taking wrong return statement
      // return (root->val) + lh + rh ; => return (root->val) + max(lh,rh); 
  // 3. forgot about negative case
      // lh = f(root,maxi) => lh = max(0,f(root,maxi))
  class Solution {
  public:
      int maxCommon(TreeNode* root,int & maxi){
        if(root == nullptr) return 0;
        int lh = max(0,maxCommon(root->left,maxi)); // ⭐
        int rh = max(0,maxCommon(root->right,maxi)); // ⭐
        
        maxi = max(maxi, root->val + lh + rh); // ⭐
        
        return (root->val) + max(lh,rh); // ⭐
      } 
      int maxCommon(TreeNode* root,int & maxi){
          if(root == nullptr) return 0;
          int lh = maxCommon(root->left,maxi);
          int rh = maxCommon(root->right,maxi);
          lh = max(0,lh), rh = max(rh,0);
          
          maxi = max(maxi, root->val + lh + rh);
          
          return (root->val) + max(lh,rh); 
      }
      int maxPathSum(TreeNode* root) {
          int maxi = INT_MIN;
          maxCommon(root,maxi);
          return maxi;
      }
 };
/* Check if two trees are identical or not || Same Tree */
  class Solution {
  public:
      bool isSameTree(TreeNode* p, TreeNode* q) {
          if(p == nullptr or q == nullptr) return (p==q); // ⭐
          return (p->val == q->val) and isSameTree(p->left,q->left) and isSameTree(p->right,q->right);
      }
  };
/* zig - zag traversal */
  #define sz(x)      (int)((x).size())
  class Solution {
  public:
      vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
          vector<vector<int>> ans;
          if(root == nullptr) return ans;
          
          queue<TreeNode*> q;
          q.push(root);
          bool isReverse = false;
          
          while(!q.empty()){
              int size = sz(q);
              vector<int> temp(size);
              for(int i=0;i<size;i++){
                  auto it = q.front();
                  q.pop();
                  int ind = isReverse ? size - i - 1 : i;
                  temp[ind] = it->val;
                  // temp.push_back(it->val);
                  if(it->left) q.push(it->left);
                  if(it->right) q.push(it->right);
              }
              
              isReverse = !isReverse;
              ans.push_back(temp);
          }
          
          return ans;
      }
  };

/* Boundary Traversal of binary tree */
    class Solution {
    public:
        bool isLeaf(Node *root){
            if(root->right == nullptr and root->left == nullptr)
                return true;
            else return false;
        }
        void leftTraverse(Node *root,vector<int> &res){
            root = root->left;
            while(root){
                if(!isLeaf(root)) res.push_back(root->data);
                if(root->left) root = root->left;
                else root = root->right;
            }
        }
        void inorder(Node *root,vector<int> &res){
            if(isLeaf(root)){
                res.push_back(root->data);
                return;
            } 
            if(root->left) inorder(root->left,res);
            if(root->right) inorder(root->right,res);
        }
        void rightTraverse(Node *root,vector<int> &res){
            root = root->right;
            stack<int> st;
            while(root){
                if(!isLeaf(root)) st.push(root->data);
                if(root->right) root = root->right;
                else root = root->left;
            }
            while(!st.empty()) res.push_back(st.top()),st.pop();
        }
        vector <int> boundary(Node *root){
            vector<int> res;
            if(root == nullptr) return res;
            if(isLeaf(root)){
                res.push_back(root->data);
                return res;
            }
            res.push_back(root->data);
            leftTraverse(root,res);
            inorder(root,res);
            rightTraverse(root,res);
            return res;
        }
    };
/* Vertical Order Traversal of a Binary Tree ⭐
    1. most complex data structure
        map<int,pair<int,TreeNode*>> => map<int,map<int,multiset<int>>>
    2.  for(auto i : mp){
            vector<int> col;
            for(auto j : i.second){
                col.insert(col.end(),j.second.begin(),j.second.end());
            }
            res.push_back(col);
        } */
    class Solution {
    public:
        vector<vector<int>> verticalTraversal(TreeNode* root) {
            vector<vector<int>> res;
            if(root == nullptr) return res;
            
            map<int,map<int,multiset<int>>> mp;
            queue<pair<TreeNode*,pair<int,int>>> q;
            
            q.push({root,{0,0}});
            
            while(!q.empty()){
                auto it = q.front();
                q.pop();
                
                auto node = it.first;
                int x = it.second.first;
                int y = it.second.second;
                
                mp[x][y].insert(node->val);
                
                if(node->left) q.push({node->left,{x-1,y+1}});
                if(node->right)     ;
            }
            
            for(auto i : mp){
                vector<int> col;
                for(auto j : i.second){
                    col.insert(col.end(),j.second.begin(),j.second.end());
                }
                res.push_back(col);
            }
            return res;
        }
    };

/* Top View of Binary Tree 
    1. forgot q.push({root,0}); */
    class Solution{
        public:
        vector<int> topView(Node *root){
            vector<int> res;
            if(root == nullptr) return res;
            
            map<int,Node*> mp;
            queue<pair<Node*,int>> q;
            
            q.push({root,0});
            
            while(!q.empty()){
                auto it = q.front();
                q.pop();
                
                Node* node = it.first;
                int level = it.second;
                
                if(mp.find(level) == mp.end()) mp[level] = node;
                // mp[level] = node;
                
                if(node->left) q.push({node->left,level-1});
                if(node->right) q.push({node->right,level+1});
            }
            
            for(auto i : mp) res.push_back(i.second->data);
            return res;
        }

    };

/* Bottom View of Binary Tree 
    1. if(root->left) => if(node->left) and
        if(root->right) => if(node->right)
    2. q.push({node,level-1}) => q.push({node->left,level-1}) and 
        q.push({node,level+1}) => q.push({node->right,level+1}) 
    3. queue<Node,int> => queue<pair<Node*,int>> 
    4. q.pop() forgot */
    class Solution {
    public:
        vector <int> bottomView(Node *root) {
            vector<int> res;
            if(root == nullptr) return res;
            map<int,Node*> mp;
            queue<pair<Node*,int>> q;
            
            q.push({root,0});
            
            while(!q.empty()){
                auto it = q.front();
                q.pop();
                
                Node* node = it.first;
                int level = it.second;
                
                mp[level] = node;
                
                if(node->left) q.push({node->left,level-1}); // ⭐
                if(node->right) q.push({node->right,level+1}); // ⭐
            }
            
            for(auto i : mp) res.push_back(i.second->data);
            
            return res;
        }
    };

/* Binary Tree Left Side View */
  #define all(x)     (x).begin(),(x).end()
  class Solution2 {
  public:
      vector<int> preorder;
      void preOrderTraversal(TreeNode* root,int level){
          if(root == nullptr) return;   
          
          if(level == preorder.size()) preorder.push_back(root->val);
          
          preOrderTraversal(root->left,level+1);
          preOrderTraversal(root->right,level+1);
      }
      vector<int> rightSideView(TreeNode* root) {
          preOrderTraversal(root,0);
          return preorder;
      }
  };

/* Binary Tree Right Side View */
  #define all(x)     (x).begin(),(x).end()
  class Solution3 {
  public:
      vector<int> preorder;
      void preOrderTraversal(TreeNode* root,int level){
          if(root == nullptr) return;   
          
          if(level == preorder.size()) preorder.push_back(root->val);
          
          preOrderTraversal(root->right,level+1);
          preOrderTraversal(root->left,level+1);
      }
      vector<int> rightSideView(TreeNode* root) {
          preOrderTraversal(root,0);
          return preorder;
      }
  };

/* Symmetric Tree */
  class Solution1 {
  public:
      bool sameTree(TreeNode* root1,TreeNode* root2){
          if(root1 == nullptr or root2 == nullptr) return (root1 == root2);
          return (root1->val==root2->val) && sameTree(root1->left,root2->right) && sameTree(root1->right,root2->left);
      }
      bool isSymmetric(TreeNode* root) {
          if(root == nullptr) return true;
          return sameTree(root->left,root->right);
      }
  };

/* Path to Given Node */
    bool getPath(TreeNode* A, int B, vector<int>& res){
        if(A == NULL) return false;
        res.push_back(A->val);
        if(A->val == B) return true;
        if(getPath(A->left,B,res) or getPath(A->right,B,res)) return true;
        res.pop_back();
        return false;
    }
    
    vector<int> Solution::solve(TreeNode* A, int B) {
        vector<int> res;
        getPath(A,B,res);
        return res;
    }

/* LCA Lowest Common Ancestor of a Binary Tree */
    class Solution {
    public:
        TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
            if(root == NULL or root == p or root == q) return root;
            
            TreeNode* left = lowestCommonAncestor(root->left,p,q);
            TreeNode* right = lowestCommonAncestor(root->right,p,q);
            
            if(left == NULL) return right;
            else if(right == NULL) return left;
            else return root;
        }
    };

/* Maximum Width of Binary Tree */
    template<typename T,typename T1>T amax(T &a,T1 b){if(b>a)a=b;return a;}
    class Solution {
    public:
        int widthOfBinaryTree(TreeNode* root) {
            int ans = 0;   
            queue<pair<TreeNode*,long long int>> q;
            q.push({root,0});
            
            while(!q.empty()){
                int sz = q.size();
                long long int mini = q.front().second;
                long long int first = 0,last = 0;
                
                for(int i=0;i<sz;i++){
                    TreeNode* node = q.front().first;
                    long long int level = q.front().second - mini;
                    q.pop();
                    
                    if(i == 0) first = level;
                    if(i == sz - 1) last = level;
                    if(node->left) q.push({node->left,2*level+1});
                    if(node->right) q.push({node->right,2*level+2});
                }
                
                ans = amax(ans,abs(last - first + 1));
            }
            
            return ans;
        }
    };

/* Check for Children Sum Property */
    void changeTree(BinaryTreeNode < int > * root) {
        if(root == nullptr) return;
        int child = 0;
        if(root->left) child += root->left->data;
        if(root->right) child += root->right->data;
        
        if(child >= root->data) root->data = child;
        else{
            if(root->left) root->left->data = root->data;
            if(root->right) root->right->data = root->data;
        }
        
        changeTree(root->left);
        changeTree(root->right);
        
        child = 0;
        if(root->left) child += root->left->data;
        if(root->right) child += root->right->data;
        if(root->left or root->right) root->data = child;
    }  
/* All Nodes Distance K in Binary Tree */
    class Solution {
    public:
        void makeParent(TreeNode* root,map<TreeNode*,TreeNode*>& mp){
            queue<TreeNode*> q;
            q.push(root);
            while(!q.empty()){
                TreeNode* node = q.front();
                q.pop();
                if(node->left){
                    mp[node->left] = node;
                    q.push(node->left);  
                } 
                if(node->right){
                    mp[node->right] = node;
                    q.push(node->right);
                }
            }
        }
        vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
            map<TreeNode*,TreeNode*> parent;
            makeParent(root,parent);
            map<TreeNode*,bool> vis;
            vis[target] = true;
            int currLevel = 0;
            queue<TreeNode*> q;
            q.push(target);
            while(!q.empty()){
                int sz = q.size();
                if(currLevel++ == k) break;
                
                for(int i=0;i<sz;i++){
                    TreeNode* node = q.front();
                    q.pop();

                    if(node->left and !vis[node->left]){
                        vis[node->left] = true;
                        q.push(node->left);
                    }
                    if(node->right and !vis[node->right]){
                        vis[node->right] = true;
                        q.push(node->right);
                    }
                    if(parent[node] and !vis[parent[node]]){
                        vis[parent[node]] = true;
                        q.push(parent[node]);
                    }
                }
            }
            vector<int> res;
            while(!q.empty()){
                TreeNode *node = q.front();
                q.pop();
                res.push_back(node->val);
            }
            return res;
        }
    };

/* Time To Burn Tree */
    BinaryTreeNode<int>* makeParent(BinaryTreeNode<int>* root,map<BinaryTreeNode<int>*,BinaryTreeNode<int>*> & mp,int start){
    BinaryTreeNode<int>* dummy;
        queue<BinaryTreeNode<int>*> q;
        q.push(root);
        while(!q.empty()){
            BinaryTreeNode<int>* node = q.front();
            q.pop();
            if(node->data == start) dummy = node;
            if(node->left){
                mp[node->left] = node;
                q.push(node->left);
            }
            if(node->right){
                mp[node->right] = node;
                q.push(node->right);
            }
        }
        return dummy;
    }
    int timeToBurnTree(BinaryTreeNode<int>* root, int start){
        map<BinaryTreeNode<int>*,BinaryTreeNode<int>*> parent;
        map<BinaryTreeNode<int>*,bool> vis;
        queue<BinaryTreeNode<int>*> q;
        int maxi = 0;
        
        BinaryTreeNode<int>* target = makeParent(root,parent,start);
        vis[target] = true;
        q.push(target);
        
        while(!q.empty()){
            int sz = q.size();
            bool flag = false;
            
            for(int i=0;i<sz;i++){
                BinaryTreeNode<int>* node = q.front();
                q.pop();
                
                if(node->left and !vis[node->left]){
                    vis[node->left] = true;
                    q.push(node->left);
                    flag = true;
                }
                
                if(node->right and !vis[node->right]){
                    vis[node->right] = true;
                    q.push(node->right);
                    flag = true;
                }
                
                if(parent[node] and !vis[parent[node]]){
                    vis[parent[node]] = true;
                    q.push(parent[node]);
                    flag = true;
                }
            }
            
            if(flag) maxi++;
        }
        return maxi;
    }

/* Count Complete Tree Nodes */
    // brute
        class Solution {
        public:
            void pre(TreeNode* root,int &cnt){
                if(root == NULL) return;
                cnt++;
                pre(root->left,cnt);
                pre(root->right,cnt);
            }
            int countNodes(TreeNode* root) {
                int cnt = 0;
                pre(root,cnt);
                return cnt;
            }
        };
    
    // optimal
    class Solution {
    public:
        int countNodes(TreeNode* root) {
            int cnt = 0;
            int lh = leftH(root);
            int rh = rightH(root);
                
            if(lh == rh) return (1<<lh)-1;
            
            return 1 + countNodes(root->left) + countNodes(root->right);
        }
        int leftH(TreeNode* root){
            int h = 0;
            while(root) root = root->left, h++;
            return h;
        }
        int rightH(TreeNode* root){
            int h = 0;
            while(root) root = root->right, h++;
            return h;
        }
    };

/* Construct Binary Tree from Preorder and Inorder Traversal */
    class Solution {
    public:
        TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
            map<int, int> mp;
            for (int i = 0; i < inorder.size(); ++i) mp[inorder[i]] = i;

            TreeNode* root = pre(preorder,0,preorder.size()-1,inorder,0,
                    inorder.size()-1,mp);
            return root;
        }
        TreeNode* pre(vector<int>& preorder,int preS,int preE,vector<int>& inorder,
            int inS,int inE,map<int, int>& mp){
            if(inS > inE or preS > preE) return NULL;
            TreeNode* root = new TreeNode(preorder[preS]);
            int inR = mp[root->val];
            int numL = inR - inS;

            root->left = pre(preorder,preS+1,preS+numL,inorder,inS,
                    inR-1,mp);
            root->right = pre(preorder,preS+numL+1,preE,inorder,inR +1,
                    inE,mp);

            return root;
        }
    };

/* Construct Binary Tree from Inorder and Postorder Traversal */
    class Solution {
    public:
        TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
            map<int, int> mp;
            for (int i = 0; i < inorder.size(); ++i) mp[inorder[i]] = i;

            TreeNode* root = pre(postorder,0,postorder.size()-1,inorder,0,
                    inorder.size()-1,mp);
            return root;
        }
        TreeNode* pre(vector<int>& postorder,int poS,int poE,vector<int>& inorder,
            int inS,int inE,map<int, int>& mp){
            if(inS > inE or poS > poE) return NULL;
            TreeNode* root = new TreeNode(postorder[poE]);
            int inR = mp[root->val];
            int numL = inR - inS;

            root->left = pre(postorder,poS,poS+numL - 1,inorder,inS,
                    inR-1,mp);
            root->right = pre(postorder,poS+numL,poE-1,inorder,inR +1,
                    inE,mp);

            return root;
        }
        
    };

/* Serialize and deserialize Binary Tree */
    class Codec {
    public:
        string serialize(TreeNode* root) {
            string s = "";
            if(root == NULL) return s;
            queue<TreeNode*> q;
            q.push(root);
            while(!q.empty()){
                TreeNode* node = q.front();
                q.pop();
                if(node == NULL) s.append("#,");
                else s.append(to_string(node->val) + ',');
                if(node != NULL){
                    q.push(node->left);
                    q.push(node->right);
                }
            }
            return s;
        }

        // Decodes your encoded data to tree.
        TreeNode* deserialize(string data) {
            stringstream s(data);
            string str = "";
            if(data.size() == 0) return NULL;
            getline(s,str,',');
            TreeNode* root = new TreeNode(stoi(str));
            queue<TreeNode*> q;
            q.push(root);
            while(!q.empty()){
                TreeNode * curr = q.front();
                q.pop();
                
                getline(s,str,',');
                if(str == "#") curr->left = nullptr;
                else{
                    TreeNode* node = new TreeNode(stoi(str));
                    curr->left = node;
                    q.push(node);
                }
                
                getline(s,str,',');
                if(str == "#") curr->right = nullptr;
                else{
                    TreeNode* node = new TreeNode(stoi(str));
                    curr->right = node;
                    q.push(node);
                }
            }
            return root;
        }
    };

/*  Morris Preorder Traversal of a Binary Tree
    Morris Inorder Traversal of a Binary Tree 🔥 */
/*  Flatten Binary Tree to LinkedList 🔥 */
/*  Search in a Binary Search Tree */
    class Solution {
    public:
        TreeNode* searchBST(TreeNode* root, int val) {
            while(root!=NULL and root->val  != val) root = val < root->val ? root->left : root->right;
            return root;
        }
    };
/*  Ceil from BST */
    int findCeil(BinaryTreeNode<int> *node, int x){
        int ans = -1;
        while(node){ // here not true
            if(x == node->data){
                ans = node->data;
                break;
            }else if(x < node->data){
                ans = node->data;
                node = node->left;
            }else{
                node = node->right;
            }   
        }
        return ans;
    }
/*  Floor in BST  */
    int floorInBST(TreeNode<int> * root, int value){
        int ans = -1;
        while(root){
            if(value == root->val){
                ans = value;
                break;
            }else if(value > root->val){
                ans = root->val;
                root = root->right;
            }else root = root->left;
        }
        return ans;
    }
/*  Insert into a Binary Search Tree */
    class Solution {
    public:
        TreeNode* insertIntoBST(TreeNode* root, int val) {
            if(root == nullptr) return new TreeNode(val);
            TreeNode* dummy = root;
            while(root){
                if(root-> val > val){
                    if(root->left == nullptr){
                        root->left = new TreeNode(val);
                        break;
                    }else root=root->left;
                }else{
                    if(root->right == nullptr){
                        root->right = new TreeNode(val);
                        break;
                    }else root=root->right;
                }
            }
            return dummy;
        }
    };
/*  Delete Node in a BST */
    class Solution {    
    public:
        TreeNode* deleteNode(TreeNode* root, int val) {
            if(root == nullptr) return nullptr; // mistake
            if(root->val == val) return helper(root); // mistake
            TreeNode* root1 = root; // mistake
            while(root){ // true
                if(root->val > val){
                    if(root->left != nullptr and root->left->val == val){
                        root->left = helper(root->left);
                        break;
                    }else root = root->left;
                }else{
                    if(root->right != nullptr and root->right->val == val){
                        root->right = helper(root->right);
                        break;
                    }else root = root->right;
                }
            }
            return root1;
        }
        TreeNode* helper(TreeNode* root){
            if(root->left == nullptr) return root->right;
            else if(root->right == nullptr) return root->left;
            TreeNode* leftTree = leftMostRight(root->left); // mistake right
            TreeNode* rightTree = root->right;
            leftTree->right = rightTree;
            return root->left;
        }
        TreeNode* leftMostRight(TreeNode* root){
            if(root->right == nullptr) return root;
            else return leftMostRight(root->right);
        }
    };



/*  Construct Binary Search Tree from Preorder Traversal */
    class Solution {
    public:
        TreeNode* pre(vector<int>& preorder,int preS,int preE,vector<int>& inorder,
            int inS,int inE,map<int, int>& mp){
            if(inS > inE or preS > preE) return NULL;
            TreeNode* root = new TreeNode(preorder[preS]);
            int inR = mp[root->val];
            int numL = inR - inS;

            root->left = pre(preorder,preS+1,preS+numL,inorder,inS,
                    inR-1,mp);
            root->right = pre(preorder,preS+numL+1,preE,inorder,inR +1,
                    inE,mp);

            return root;
        }
        TreeNode* bstFromPreorder(vector<int>& inorder) {
            vector<int> preorder = inorder;
            sort(inorder.begin(),inorder.end());
            map<int,int> mp;
            for (int i = 0; i < inorder.size(); ++i) mp[inorder[i]] = i;
            TreeNode* root = pre(preorder,0,preorder.size()-1,inorder,0,inorder.size()-1,mp);
            return root;
        }
    };

/*  Inorder Successor in BST */
    class Solution{
    public:
        // returns the inorder successor of the Node x in BST (rooted at 'root')
        Node * inOrderSuccessor(Node *root, Node *x){
            Node* ans = NULL;
            while(root){
                if(root->data <= x->data){
                    root = root->right;
                }else{
                    ans = root;
                    root = root->left;
                }
            }
            return ans;
        }
    };

/*  Binary Search Tree Iterator */
    class BSTIterator {
        stack<TreeNode*> st;
    public:
        BSTIterator(TreeNode* root) { pushAll(root); }
        int next() {
            TreeNode* node = st.top();
            st.pop();
            pushAll(node->right);
            return node->val;
        }
        bool hasNext() { return !st.empty(); }
        void pushAll(TreeNode* root){
            while(root){
                st.push(root);
                root = root->left;
            }
        }
    };

/*  Two Sum IV - Input is a BST */w
    class Solution {
    private:
        vector<int> inorder;
    public:
        void pre(TreeNode* root){
            if(!root) return;
            pre(root->left);
            inorder.push_back(root->val);
            pre(root->right);
        }
        bool findTarget(TreeNode* root, int k) {
            pre(root);
            int low = 0,high = inorder.size() -1;
            while(low < high){
                if(inorder[low] + inorder[high] == k){
                    return true;
                }else if(inorder[low] + inorder[high] < k){
                    low++;
                }else high--;
            }
            return false;
        }
    };

    class BSTIterator {
    private:
        stack<TreeNode*> st;
        bool isReverse = false;
    public:
        BSTIterator(TreeNode* root,bool isReverse) : isReverse(isReverse) { pushAll(root); }
        int next() { 
            TreeNode* node = st.top();
            st.pop();
            if(!isReverse) pushAll(node->right);
            else pushAll(node->left);
            return node->val;
        }
        bool hasNext() { return !st.empty(); }
        void pushAll(TreeNode* root){
            while(root){
                st.push(root);
                if(!isReverse) root = root->left;
                else root = root->right;
            }
        }
    };

    class Solution {
    public:
        bool findTarget(TreeNode* root, int k) {
            BSTIterator l(root,false), h(root,true);
            int low = l.next();
            int high = h.next();
            while(low < high){
                if(low + high == k){
                    return true;
                }else if(low + high < k){
                    low = l.next();
                }else high = h.next();
            }
            return false;
        }
    };
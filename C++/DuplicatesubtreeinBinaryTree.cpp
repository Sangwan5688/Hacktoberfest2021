//Backend complete function template for C++

class Solution {
  public:
    unordered_set<string> subtrees;
    char MARKER = '$'; 
    // This function returns empty string if tree
    // contains a duplicate subtree of size 2 or more.
    string dupSubUtil(Node *root)
    {
        string s = "";
     
        // If current node is NULL, return marker
        if (root == NULL)
            return s + MARKER;
     
        // If left subtree has a duplicate subtree.
        string lStr = dupSubUtil(root->left);
        if (lStr.compare(s) == 0)
           return s;
     
        // Do same for right subtree
        string rStr = dupSubUtil(root->right);
        if (rStr.compare(s) == 0)
           return s;
     
        // Serialize current subtree
        s = s + root->data + lStr + rStr;
     
        // If current subtree already exists in hash
        // table. [Note that size of a serialized tree
        // with single node is 3 as it has two marker
        // nodes.
        if (s.length() > 3 and 
            subtrees.find(s) != subtrees.end())
           return "";
     
        subtrees.insert(s);
     
        return s;
    }
    
    int dupSub(Node *root)
    {
    	//subtrees.clear();
    	string str = dupSubUtil(root);
     
        if(str.compare("") == 0)
            return 1;
        else
            return 0;
    }
};

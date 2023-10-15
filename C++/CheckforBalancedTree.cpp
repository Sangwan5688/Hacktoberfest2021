
//Function to check whether a binary tree is balanced or not.
class Solution{
public:
    //Function to check for balanced tree.
    bool isBalancedRec(Node *root, int* height)
    {
      int lh = 0, rh = 0;
      int l = 0, r = 0;
    
      //if root is null, we return true.
      if(root == NULL)
      {
        *height = 0;
         return 1;
      }
    
      //calling the function isBalancedRec recursively for the heights of left and
      //right subtrees and storing the returned values in l and r.
      l = isBalancedRec(root->left, &lh);
      r = isBalancedRec(root->right,&rh);
    
      //height of current node is (max of heights of left and right subtrees) +1.
      *height = (lh > rh? lh: rh) + 1;
    
      //if difference between heights of left and right subtrees is 2 or more 
      //than 2 then this node is not balanced so we return false.
      if((lh - rh >= 2) || (rh - lh >= 2))
        return 0;
    
      //if this node is balanced and left and right subtrees are balanced 
      //then we return true.
      else 
      return l&&r;
    }
    
    bool isBalanced(Node *root)
    {
       int h = 0;
       return isBalancedRec(root, &h);
    }
};

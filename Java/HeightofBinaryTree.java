

//User function Template for Java

/* 
class Node
{
    int data;
    Node left, right;

    Node(int item)
    {
        data = item;
        left = right = null;
    }
}
 */

class Solution {
    //Function to find the height of a binary tree.
    int height( Node node) 
    {
        if(node == null){
            return 0;
        }
        else{
              int leftheight = 0, rightheight = 0;
              
              if(node.left != null){
                leftheight = height(node.left);
              }
              if(node.right != null){
                  rightheight = height(node.right);
              }
              
              int max = (leftheight > rightheight) ? leftheight:rightheight;
              return(max + 1);
        }
    }
}

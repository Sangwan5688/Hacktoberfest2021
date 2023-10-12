/*  
    * Print GFG n times 
    ? https://practice.geeksforgeeks.org/problems/print-gfg-n-times/1
*/
class Solution {
  public:
    void printGfg(int N) {
        if(N == 0) return;
        cout<<"GFG"<<" ";
        printGfg(N-1);
    }
};
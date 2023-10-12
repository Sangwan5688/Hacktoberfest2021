/*  
    * Print 1 to n without using loops
    ? https://practice.geeksforgeeks.org/problems/print-1-to-n-without-using-loops3621/1
*/
class Solution{
    public:
    void printTillN(int n){
        if(n == 0) return;
        printTillN(n-1);
        cout<<n<<" ";
    }
};

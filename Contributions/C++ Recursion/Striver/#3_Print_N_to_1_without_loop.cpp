/*  
    * Print N to 1 without loop
    ? https://practice.geeksforgeeks.org/problems/print-n-to-1-without-loop/1?page=1&sortBy=newest&query=page1sortBynewest
*/
class Solution {
    public:
    void printNos(int n){
        if(n == 0) return;
        cout<<n<<" ";
        printNos(n-1);
    }
};
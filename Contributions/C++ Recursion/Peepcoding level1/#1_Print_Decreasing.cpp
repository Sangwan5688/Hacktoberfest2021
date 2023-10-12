/* 
    TODO: Print Decreasing
    ? https://practice.geeksforgeeks.org/problems/print-n-to-1-without-loop/1?page=1&sortBy=newest&query=page1sortBynewest
 */

class Solution {
    void printNos(int n) {
        if(n == 0) return;
        System.out.print(n + " ");
        printNos(n-1);
    }
}
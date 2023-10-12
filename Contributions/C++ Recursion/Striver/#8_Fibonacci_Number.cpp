/*  
    * Fibonacci Number
    ? https://leetcode.com/problems/fibonacci-number/
*/
class Solution {
    public:
    int fib(int n) {
        if(n <= 1) return n;
        else return fib(n-1) + fib(n-2);
    }
};
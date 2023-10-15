/* 
    TODO: Factorial
    ? https://practice.geeksforgeeks.org/problems/factorial5739/1
 */

class Solution{
    static long factorial(int n){
        if(n <= 1) return 1;
        else return factorial(n-1)*n;
    }
}
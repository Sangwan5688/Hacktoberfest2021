/*
    * Factorial
    ? https://practice.geeksforgeeks.org/problems/factorial5739/1
*/
class Solution{
    public:
    long long int factorial(int n){
        if(n <= 1) return 1;
        else return n*factorial(n-1);
    }
};
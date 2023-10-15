/* 
    TODO: Power-linear
    ? https://practice.geeksforgeeks.org/problems/power-of-numbers-1587115620/1
 */

class Solution {
    long mod = (long)1e9 + 7;
    long power(int n,int r) {
        if(r == 1) return n;
        else return (n * power(n,r-1))%mod;
    }
}


class Solution {
    long mod = (long)1e9 + 7;
    long power(int a,int b) {
        if(b == 0) return 1;
        long res = power(a, b>>1);
        if(b%2 == 1) return (((res * res) % mod) * a) % mod;
        else return ((res * res) % mod);
    }
}
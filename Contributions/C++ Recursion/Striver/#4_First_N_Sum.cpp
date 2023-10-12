/*
    * First N Sum
    ? https://www.codingninjas.com/codestudio/problems/first-n_4605104?leftPanelTab=1
*/
class Solution{
    public:
    long long int pre(int n){
        if(n == 0) return 0;
        else return n + pre(n-1);
    }
    long long int firstN(int n) {
        return pre(n);
    }
};
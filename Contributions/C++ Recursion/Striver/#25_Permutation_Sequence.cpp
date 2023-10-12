/*
    * Permutation Sequence
    ? https://leetcode.com/problems/permutation-sequence/
    ! k--
    ! k = k%fact;
    ! fact = fact / number.size();
*/
class Solution {
    public:
    string getPermutation(int n, int k) {
        int fact = 1;
        vector<int> number;
        for(int i=1;i<n;i++){
            fact = fact*i;
            number.push_back(i);
        }
        number.push_back(n);
        string ans = "";
        k--;
        while(true){
            ans = ans + to_string(number[k/fact]);
            number.erase(number.begin() + k/fact);
            if(number.size() == 0) break;
            k = k%fact;
            fact = fact / number.size();
        }
        return ans;
    }
};
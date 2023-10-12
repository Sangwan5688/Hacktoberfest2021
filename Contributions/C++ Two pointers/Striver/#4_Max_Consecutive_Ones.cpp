/*
    TODO: Max Consecutive Ones
    ? https://leetcode.com/problems/max-consecutive-ones/description/
*/

class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int consOne = 0,currOne = 0;
        for(auto i : nums){
            if(i == 1){
                currOne++;
                consOne = max(consOne,currOne);
            }else currOne = 0;
        }
        return consOne;
    }
};

class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int maxi = 0;
        int curr = 0;
        for(auto i : nums){
            if(i==1) curr++;
            if(i==0){
                if(maxi<curr) 
                    maxi = curr;
                curr=0;
            }
        }
        if(maxi<curr) 
            maxi = curr;
        return maxi;
            
    }
};
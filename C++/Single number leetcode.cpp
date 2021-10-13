class Solution {
public:
    
    int singleNumber(vector<int>& nums) {
        int exor=nums[0];
        int n=nums.size();
        for(int i=1;i<n;i++){
            exor=exor^nums[i];
        }
        return exor;
    }
};

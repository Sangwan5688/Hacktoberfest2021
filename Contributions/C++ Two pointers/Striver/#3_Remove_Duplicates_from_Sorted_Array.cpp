/*
    TODO: Remove Duplicates from Sorted Array
    ? https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/
*/

// ? 2 pointer

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() <= 1) return 1;
        int l=0,h=0;
        
        while(h < nums.size()){
            if(nums[l] == nums[h]) h++;
            else l++,nums[l] = nums[h],h++;
        }

        return l+1;
    }
};

// ? hash map

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        map<int,int> mp;
        for(auto i : nums) mp[i]++;
        
        int ind =0;
        for(auto i:mp){
            nums[ind] = i.first;
            ind++;
        }

        return mp.size();
    }
};

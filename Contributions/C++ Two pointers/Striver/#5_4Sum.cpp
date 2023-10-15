/*
    TODO: 4Sum
    ? https://leetcode.com/problems/4sum/

    ! long long int ab = nums[i] + nums[j]; there was a overflow
*/

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> ans;
        sort(nums.begin(),nums.end());

        for(int i=0;i<nums.size()-1;i++){
            if(i > 0 and nums[i] == nums[i-1]) continue;
            for(int j=i+1;j<nums.size()-2;j++){
                if(j > i+1 and nums[j] == nums[j-1]) continue;

                // long long int rem = target - (nums[i] + nums[j]);
                long long int ab = nums[i] + nums[j]; // 🔥
                int low = j+1,high = nums.size()-1;
                while(low<high){
                    vector<int> temp;
                    int no = nums[low] + nums[high];
                    // cout<<no<<" "<<target<<endl;
                    if(ab + no == target){
                        temp.insert(temp.end(),{nums[i],nums[j],nums[low],nums[high]});
                        ans.push_back(temp);
                        
                        while(low < high and nums[low] == nums[low+1]) low++;
                        while(low < high and nums[high] == nums[high-1]) high--;

                        low++;
                    }
                    else if(ab + no < target) low++;
                    else high--;
                }

            }
        }

        return ans;
    }
};
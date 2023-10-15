/*
    TODO: 3Sum
    ? https://leetcode.com/problems/3sum/

    ! remove the duplicate one 
    ! remove until new value of low and high is found
*/

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> ans;
        sort(nums.begin(),nums.end());
        
        for(int i=0;i<nums.size();i++){
            if( i > 0 and nums[i] == nums[i-1]) continue; // 🔥
            int low = i+1,high = nums.size()-1,prLow = 0,prHigh = 0;

            while(low < high ){
                vector<int> temp;
                int no = (nums[low] + nums[high]);
                if(no == -nums[i]){
                    temp.insert(temp.end(),{nums[i],nums[low],nums[high]});
                    ans.push_back(temp);

                    while(low < high and nums[low] == nums[low+1]) low++; // 🔥
                    while(low < high and nums[high] == nums[high-1]) high--; // 🔥

                    low++;
                }
                else if(no < -nums[i]) low++;
                else high--;
            }
        }
        
        return ans;
    }
};



class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        set<vector<int>> ans;
        sort(nums.begin(),nums.end());
        
        for(int i=0;i<nums.size();i++){
            if( i > 0 and nums[i] == nums[i-1]) continue; // 🔥
            int low = i+1,high = nums.size()-1,prLow = 0,prHigh = 0;

            while(low < high ){
                vector<int> temp;
                int no = (nums[low] + nums[high]);
                if(no == -nums[i]){
                    temp.insert(temp.end(),{nums[i],nums[low],nums[high]});
                    ans.insert(temp);
                    // temp.clear();
                    low++;
                }
                else if(no < -nums[i]){
                    low++;
                }
                else{
                    high--;
                }
            }
        }
        
        vector<vector<int>> ans1;
        for(auto i : ans) ans1.push_back(i);
        return ans1;
    }
};

#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
   int func(int i,vector<int>& nums,vector<int>& dp){
    
    if(i==0)return nums[0];
   if(dp[i]!=-1)return dp[i];
   int  nottake=0+ func(i-1,nums,dp);
    int take=nums[i];
    if(i>=2) take=nums[i]+func(i-2,nums,dp);
    return dp[i]=max(nottake,take);
}
    int rob(vector<int>& nums) {
        int n=nums.size();
        vector<int> dp1(n,-1);
         vector<int> dp2(n,-1);
        vector<int>temp1,temp2;
        if(n==1)return nums[0];
        for(int i=0;i<n;++i){
            if(i!=0)temp1.push_back(nums[i]);
            if(i!=n-1)temp2.push_back(nums[i]);
        }
       
        return max(func(n-2,temp1,dp1),func(n-2,temp2,dp2));
    }
};



int main()
{}
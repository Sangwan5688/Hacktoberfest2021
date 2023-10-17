#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findIndices(vector<int>& nums, int indexDifference, int valueDifference) {
        int n=nums.size();

        for(int i=0;i<n;i++){
            for(int j=i+indexDifference;j<n;j++){
                if(abs(nums[i]-nums[j])>=valueDifference){
                    return {i,j};
                }
            }
        }
        return {-1,-1};
    }
};
int main(){
    int n,indexDifference,valueDifference;
    cin>>n;
    vector<int>nums(n);
    for(int i=0;i<n;i++){
        cin>>nums[i];
    }
    cin>>indexDifference>>valueDifference;
    vector<int> ans=findIndices(nums,indexDifference,valueDifference);
    return 0;

}

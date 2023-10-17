#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> findIndices(vector<int>& nums, int indexDifference, int valueDifference) {
        int size=nums.size();
        vector<pair<int,int>>numInd(size);
        for(int i=0;i<size;i++)
            numInd[i]={nums[i],i};
        sort(numInd.begin(),numInd.end());
        int i=0,j=0;
        vector<int>minm(size);
        vector<int>maxm(size);
        minm[size-1]=numInd[size-1].second;
        maxm[size-1]=numInd[size-1].second;
        for(int i=size-2;i>=0;i--){
            minm[i]=min(minm[i+1],numInd[i].second);
            maxm[i]=max(maxm[i+1],numInd[i].second);
        }
        while(j<size){
            int diff=abs(numInd[i].first-numInd[j].first);
            if(diff<valueDifference){
                j++;
                continue;
            }
            int val1=abs(numInd[i].second-maxm[j]);
            int val2=abs(numInd[i].second-minm[j]);
            if(val1>=indexDifference){
                return {numInd[i].second,maxm[j]};
            }
            if(val2>=indexDifference){
                return {numInd[i].second,minm[j]};
            }
            if(i==j)j++;
            i++;

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

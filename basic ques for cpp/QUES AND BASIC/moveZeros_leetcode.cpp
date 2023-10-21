/*Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.*/
#include<bits/stdc++.h>
using namespace std;
vector<int> moveZeros(vector<int> &arr)
{
    int nonZero=0;
    for(int i=0;i<arr.size();i++)
    {
        if(arr[i]!=0)
        {
            swap(arr[i],arr[nonZero]);
            nonZero++;
        }

    }
    
}

int print(vector<int> &arr)
{
    for(auto i:arr)
    {
        cout<<i<<" ";
    }
}
int main()
{
    vector<int> nums = {0,1,0,3,12};
    moveZeros(nums);
    print(nums);
    return 0;

}
class Solution{
    public:
    // arr: input array
    // n: size of array
    //Function to find the sum of contiguous subarray with maximum sum.
    long long maxSubarraySum(int nums[], int n){
    long long int sum =0;
long long int maxi=INT_MIN;

for(int i=0;i<n;i++){    
     
sum+=nums[i];


if(sum>maxi)
{
    maxi=sum;
}

if(sum<0){

sum=0;

}

}

return maxi;


        
    }
};

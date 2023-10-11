//Problem Statement - To find the sum of contiguous subarray within a one-dimensional array of numbers that has the largest sum. 
//Time Complexity - O(n) 
//Example - arr[] = {-2,-3,4,-1,-2,1,5,-3}   output = 7  ( Larget sum of contiguous subarray )

#include<iostream>
#include<limits.h>
using namespace std;

int main(){

    int arr[] = {-2,-3,4,-1,-2,1,5,-3};
    int meh = 0;
    int msf = INT_MIN;
    for(int i=0;i<8;i++){
        meh = meh + arr[i];
        //if Max Ending Here (meh) is smaller than the arr[i] than start the max subarray from current element
        if(meh < arr[i]){
            meh = arr[i];
        }
        //if Max Ending Here (meh) is greater than Max So Far (msf) than msf = meh 
        if(meh>msf){
            msf = meh;
        }
    }

    cout<<msf;

    return 0;
}

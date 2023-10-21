//*******************************************SQUAREROOT OF A NUMBER USING BINARY SEARCH***************************************

#include<bits/stdc++.h>
using namespace std;

long long int binarySearch(int n)
{
    long long int s=0,e=n,ans=-1;
    long long int mid=s+(e-s)/2;
    while(s<=e)
    {   

        if(mid*mid==n) return mid;

        if(mid*mid>n)
        {
            e=mid-1;
        }else{
            ans=mid;
            s=mid+1;
        } 
        mid=s+(e-s)/2;
    }
    return ans;
}

int SQRTinteger(int n)
{
    return binarySearch(n);
}


int main()
{
    int num;
    cout<<"Enter the nubmer # ";
    cin>>num;
    cout<<"Square root of "<<num<<" # "<<SQRTinteger(num);
    return 0;
}
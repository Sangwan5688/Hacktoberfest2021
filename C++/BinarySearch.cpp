#include<bits/stdc++.h>
using namespace std;
int BinarySearch(vector<int>input , int x){
    int start = 0  , end = input.size()-1 ;
    while(start<=end){
        int mid = start + (end-start)/2 ;
        if(input[mid]==x){
            return mid ;
        }
        else if(input[mid]<x){
            start = mid + 1 ;
        }else
            end = mid - 1 ;
    }
    return -1 ;
}
int main(){
    int n ; 
    cin>>n;
    vector<int>input(n) ;
    for(int i=0 ; i<n ; i++)cin>>input[i];

    int x ;
    cin>>x;

    cout<<BinarySearch(input,x);
    return 0;

}
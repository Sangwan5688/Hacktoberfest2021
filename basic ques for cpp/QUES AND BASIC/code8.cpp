#include<bits/stdc++.h>
using namespace std;

int merge(vector<int > &arr1,vector<int > &arr2)
{
    int i=arr1.size()-1,j=0;
    while(i>=0 && j<arr2.size())
    {
       if(arr1[i]>arr2[j])
       {
        swap(arr1[i],arr2[j]);
        i--,j++;
       }
       else{
        break;

       }
       
    }
    sort(arr1.begin(),arr1.end());
    sort(arr2.begin(),arr2.end());


}

int print(vector<int > &arr)
{
    for(auto i:arr)
    {
        cout<<i<<" ";
    }
}

int main()
{
    vector<int > arr1={2,4,6,8};
    vector<int > arr2={1,3,5,7,9,11};

    merge(arr1,arr2);

    print(arr1);
    print(arr2);

    return 0;
}
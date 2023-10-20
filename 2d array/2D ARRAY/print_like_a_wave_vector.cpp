#include<bits/stdc++.h>
using namespace std;

vector<int> wavePrint(vector<vector<int>> arr,int nRows,int mCols)
{
    vector<int> ans;
    for(int j=0;j<mCols;j++)
    {
        if(j&1)
        {
            for(int i=nRows-1;i>=0;i--)
            {
                ans.push_back(arr[i][j]);
            }
        }else{
            for(int i=0;i<nRows;i++)
            {
                ans.push_back(arr[i][j]);
            }
        }
    }
    return ans;
}

int main()
{
    vector<vector<int>> arr(3,vector<int>(3));
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cin>>arr[i][j];
        }
    }


    vector<int> result = wavePrint(arr,3,3);

    for(int i=0;i<result.size();i++)
    {
        cout<<result[i]<<" ";
    }
    cout<<endl;


    return 0;
}
#include<bits/stdc++.h>
using namespace std;

void solve(vector<int> arr,vector<int> output,vector<vector<int>>& ans,int index)
{
    if(index>=arr.size())
    {
        ans.push_back(output);
        return ;

    }

    solve(arr,output,ans,index+1);

    output.push_back(arr[index]);
    solve(arr,output,ans,index+1);
    output.pop_back();
}

vector<vector<int>> subsets(vector<int>& arr)
{
    vector<vector<int>> ans;
    vector<int> output;
    int index=0;
    solve(arr,output,ans,index);
    return ans;
}

int main()
{
    vector<int> arr{1,2,3};
    vector<vector<int>> ans = subsets(arr);
    for(const vector<int>i : ans)
    {
        for(int value : i)
        {
            cout<<value<<" ";
        }
        cout<<endl;
    }
    return 0;
}
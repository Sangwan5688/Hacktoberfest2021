#include<bits/stdc++.h>
using namespace std;

void solve(vector<int> arr,vector<int> output,int index,vector<vector<int>>& ans)
{
    if(index>=arr.size())
    {
        ans.push_back(output);
        return ;
    }
    solve(arr,output,index+1,ans);//excluding

    output.push_back(arr[index]);
    solve(arr,output,index+1,ans);//including
    output.pop_back();

}

vector<vector<int>> subsets(vector<int>& arr)
{
    vector<vector<int>> ans;
    vector<int> output;
    int index=0;
    solve(arr,output,index,ans);
    return ans;

}

int main()
{
    vector<int> arr {1,2,3};
    vector<vector<int>> answer=subsets(arr);
    for(const vector<int>& i : answer)
    {
        for(int value : i)
        {
            cout<<value<<" ";
        }
        cout<<endl;
    }
    return 0;
}
//all the subsequences 

#include<bits/stdc++.h>
using namespace std;


void solve(string str,string output,int index,vector<string>& ans)
{
    if(index>=str.length())
    {
        if(output.length()>0)
        {
            ans.push_back(output);//we are includding the empty string
            
        }
        
        return ;

    }
    //exclude
    solve(str,output,index+1,ans);


    //include
    output.push_back(str[index]);
    solve(str,output,index+1,ans);

}

vector<string> subsequences(string str)
{
    vector<string> ans;
    string output = "";
    int index=0;
    solve(str,output,index,ans);
    return ans;
}

int main()
{
    vector<string> str{"abc"};
    vector<string> ans=subsequences(str[0]);
    for(const string& i : ans)
    {
        cout<<i<<endl;
    }
    cout<<endl;

    return 0;
}
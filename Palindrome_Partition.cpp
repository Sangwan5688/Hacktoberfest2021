#include <bits/stdc++.h>
using namespace std;

bool palindrome(string s, int l, int r){
    if(l==r) return true;
    while(l<=r){
        if(s[l]!=s[r]) return false;
        l++;
        r--;
    }
    return true;
}

void solve(string s, int l, int r, vector<vector<string>> &ans, vector<string> &temp){
    if(l>=r){
        ans.push_back(temp);
        return;
    }
    for(int i=l;i<r;i++){
        if(palindrome(s, l, i)){
            temp.push_back(s.substr(l, i-l+1));
            solve(s, i+1, r, ans, temp);
            temp.pop_back();
        }
    }
}

vector<vector<string>> partition(string s) {
    int n = s.size();
    vector<vector<string>> ans;
    vector<string> temp;
    solve(s, 0, n, ans, temp);
    return ans;
}

int main(){
    string str;
    cin>>str;
    vector<vector<string>> ans = partition(str);
    for(int i=0;i<ans.size();i++){
        for(int j=0;j<ans[i].size();j++){
            cout<<ans[i][j];
            if(j<ans[i].size()-1) cout<<", ";
        }
        cout<<endl;
    }
}
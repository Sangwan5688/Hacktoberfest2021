/*
    TODO: Sudoku Using Bit Manipulation
    ? https://www.pepcoding.com/resources/data-structures-and-algorithms-in-java-levelup/bit-manipulation/sudoku-using-bit-manipulation-official/ojquestion
*/

#include "bits/stdc++.h"
using namespace std;

#define int        long long int

bool isValid(int row,int col,int ch,vector<vector<int>>& arr){
    for(int i=0;i<9;i++){
        if(arr[i][col] == ch) return false;
        if(arr[row][i] == ch) return false;
        if(arr[3*(row/3) + i/3][3*(col/3) + i%3] == ch) return false;
    }
    return true;    
}

bool solution(vector<vector<int>> &arr){
    for(int i=0;i<arr.size();i++){
        for(int j=0;j<arr[i].size();j++){
            if(arr[i][j] == 0){
                for(int c=1;c<=9;c++){
                    if(isValid(i,j,c,arr)){
                        arr[i][j] = c;
                        if(solution(arr)) return true;
                        else arr[i][j] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

void solve(){
    vector<vector<int>> arr(9,vector<int> (9,0));
    for(auto &i : arr) for(auto &j : i) cin>>j;

    solution(arr);
    for(auto i : arr){
        for(auto j : i){
            cout<<j<<" ";
        }
        cout<<endl;
    }
}

signed main(){
    ios_base::sync_with_stdio(false);cin.tie(NULL);
    int t = 1;
    // cin>>t;
    while(t--) solve();
    return 0;
}
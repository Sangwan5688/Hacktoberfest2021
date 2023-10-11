#include <bits/stdc++.h>
using namespace std;

int dp[101][101];

bool helper(string a, string b, string c, int n, int m, int k){
    if(n == 0 and m == 0){
        return 1;
    }

    if(dp[n][m] != -1) return dp[n][m];



    if(a[n-1] == c[k-1] or b[m-1] == c[k-1]){

        int res1 = 0,res2 = 0;

        if(a[n-1] == c[k-1]){
            res1 = helper(a,b,c,n-1,m,k-1);
        }

        if(b[m-1] == c[k-1]){
            res2 = helper(a,b,c,n,m-1,k-1);
        }

        return dp[n][m] = res1 or res2;
    }
    else{
        return dp[n][m] = false;
    }
}
bool isInterleave(string A, string B, string C) 
{

    for(int i = 0; i < A.length() + 1; i++){
        for(int j = 0; j < B.length() + 1; j++){
            dp[i][j] = -1;
        }
    }
    if(A.length() + B.length() != C.length()){
        return false;
    } 

    return helper(A,B,C,A.length(), B.length(), C.length());

}

int main() {
	int t;
	cin>>t;
	while(t--)
	{
		string a,b,c;
		cin>>a;
		cin>>b;
		cin>>c;
		
		cout<<isInterleave(a,b,c)<<endl;
	}
	return 0;
}
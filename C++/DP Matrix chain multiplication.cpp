#include<iostream>
using namespace std;
const int N = 105;
int main(){
    int dp[N][N],r[N],c[N],n=10;
    for(int i=0;i<10;i++){
        dp[i][i]=0;
    }

    for(int Len=1;Len<n;Len++){

        for(int i=0;i+Len < n ;i++){
            int k=i+Len;

            for(int j=i;j<k;j++){
//  f(i, k) = min { f(i, j) + f(j+1, k) + r[i] ⋅ c[j] ⋅ c[k] }
//  i≤j< k
                dp[i][k]=min(dp[i][k],
                    dp[i][j]+dp[j+1][k]+r[i]*c[j]*c[k]
                );
            }
        }
    }

    cout<<dp[0][n-1];
    return 0;
}
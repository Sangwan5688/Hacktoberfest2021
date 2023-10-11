/*
Given two sequences, find the length of longest subsequence present in both of them. A subsequence is a sequence that appears in the same relative order, 
but not necessarily contiguous.
Time complexity : O(N*M) where N and M are size of strings.
*/
#include<bits/stdc++.h>
using namespace std;

/* Returns length of LCS for X, Y */
int lcs(string X, string Y, int m, int n )
{
    int L[m+1][n+1];
int i, j;
 
for (i=0; i<=m; i++)
{
    for (j=0; j<=n; j++)
    {
    if (i == 0 || j == 0)
        L[i][j] = 0;
 
    else if (X[i-1] == Y[j-1])
        L[i][j] = L[i-1][j-1] + 1;
 
    else
        L[i][j] = max(L[i-1][j], L[i][j-1]);
    }
}
     
return L[m][n];
}

/* Driver program to test */
int main()
{
    string X = "OCTOBER";
    string Y = "HACKTOBER";
    int m = X.size();
    int n = Y.size();
    cout<<"Length of LCS is "<<lcs( X, Y, m, n )<<endl;
    return 0;
}

// This is accepted solution of 01 subsequence problem of october cook-off 2021
#include <bits/stdc++.h>
using namespace std;

int main() {
	// your code goes here
	int t;
	cin>>t;
	while(t--)
	{
	    int c;
	    cin>>c;
	    int ar1[507], ar2[507];
	    int l=0, r=0;
	    for(int i=0; i<c; i++)
	    {
	        if(i%2==0)
	        {
	            cin>>ar1[l];
	            l++;
	        }
	        else
	        {
	            cin>>ar2[r];
                r++;
	        }
	    }
	    sort(ar1, ar1+l, greater<int>());
	    sort(ar2, ar2+r);
	    
	    int x= max(l,r);
	    for(int i=0; i<x; i++)
	    {
	        if(i<l) cout<<ar1[i]<<" ";
	        if(i<r) cout<<ar2[i]<< " ";
	    }
	    cout<<endl;
	    int sum = 0;
        for(int i=0; i<l; i++)
        {
            for(int j = i; j<r; j++)
            {
                sum+=ar1[i] * ar2[j];
            }
        }
        cout<<sum<<endl;
	}
	return 0;
}

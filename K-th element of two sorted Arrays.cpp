#include <bits/stdc++.h>
using namespace std;
class Solution{
    public:
    int kthElement(int arr1[], int arr2[], int n, int m, int k)
    {
      int i=0,j=0,x=0;
      while(i<n and j<m){
          if(arr1[i]<arr2[j]){
          x++;
          if(x==k)
          return arr1[i];
              i++;
          }
          else{
              x++;
              if(x==k)
              return arr2[j];
              j++;
          }
      }
          while(i<n){
              x++;
              if(x==k)
              return arr1[i];
              i++;
          }
              while(j<m){
              x++;
              if(x==k)
              return arr2[j];
                  j++;
              }

      }
};
int main()
{
	int t;
	cin>>t;
	while(t--){
		int n,m,k;
		cin>>n>>m>>k;
		int arr1[n],arr2[m];
		for(int i=0;i<n;i++)
			cin>>arr1[i];
		for(int i=0;i<m;i++)
			cin>>arr2[i];
		
		Solution ob;
        cout << ob.kthElement(arr1, arr2, n, m, k)<<endl;
	}
    return 0;
}
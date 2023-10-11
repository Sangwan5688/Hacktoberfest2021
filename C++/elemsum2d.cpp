#include <iostream>

using namespace std;

int m,n;

int add(int **a,int m,int n)
{
   int t=0,i,j;
   for(i=0;i<m;i++)
   {
      for(j=0;j<n;j++)
      {
         t=t+a[i][j];
      }
   }
   return t;
}

int main()
{
   int m,n;
   cout<<"enter rows and column of matrix-\n";
   cin>>m>>n;
   int i,j,sum=0;
   int **a;
    a = new int *[m];
    for(int i = 0; i <m; i++)
        a[i] = new int[n];
   cout<<"enter the elements-\n";
   for(i=0;i<n;i++)
   {
      for(j=0;j<n;j++)
      {
         cin>>a[i][j];
      }
   }
   int p=add(a,m,n);
   cout<<p<<"\n";
   return 0;
}
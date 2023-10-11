#include<iostream>
using namespace std;

#define INF 99999

int min(int a, int b, int c)
{
    if(a>b+c && (b != INF && c != INF))
    {
        return(b+c);
    }
    else{
        return(a);
    }
}


int main()
{
    int n;
    cout<<"Enter the number of rows and columns: ";
    cin>>n;
    cout<<"Enter the adjacency matrix: ";
    int A[n][n];
    char ch;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            cin>>A[i][j];
            if(i!=j && A[i][j]==0)
            {
                A[i][j]=INF;
            }
        }
    }
    
    for(int k=0;k<n;k++)
    {
        for(int i=0;i<n;i++)
        {
            for(int j=0;j<n;j++)
            {
                A[i][j]=min(A[i][j],A[i][k],A[k][j]);
            }
        }
        printMatrix(4, A);
    }
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            if(A[i][j]==INF)
            cout<<"INF ";
            else
            cout<<A[i][j]<<" ";
        }
    cout<<"\n";
    }
}
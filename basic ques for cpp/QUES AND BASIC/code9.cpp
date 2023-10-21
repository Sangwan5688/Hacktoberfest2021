#include<bits/stdc++.h>
using namespace std;
int main()
{
    int arr[3][3]={{1,2,3},{4,5,6},{7,8,9}};
    int brr[3][3]={{1,2,3},{4,5,6},{7,8,9}};
    int result[3][3]={0};
    for(int i=0;i<3;i++){
        for(int j=0;j<3;j++){
            result[i][j]=0;
            for(int k=0;k<3;k++){
                result[i][j]+=arr[i][k]*brr[k][j];
            }
        }
    }

    for(int i=0;i<3;i++){
        for(int j=0;j<3;j++)
        {
            cout<<result[i][j]<<" ";
        }
        cout<<endl;
    }

    return 0;
}
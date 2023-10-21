#include<bits/stdc++.h>
using namespace std;

bool binary2(int arr[][5],int row,int col,int target)
{
    int rowI=0;
    int colI=col-1;
    while(rowI<row && colI>=0)
    {
        int element=arr[rowI][colI];
        if(element==target)
        {
            return 1;
        }

        if(element>target)
        {
            colI--;
        }else{
            rowI++;
        }
    }
    return 0;
}

int main()
{
    int arr[5][5]={1,4,7,11,15,2,5,8,12,19,3,6,9,16,22,10,13,14,17,24,18,21,23,26,30};
    if(binary2(arr,5,5,201))
    {
        cout<<"TRUE";
    }else{
        cout<<"FALSE";
    }

    
    return 0;
}

#include<stdio.h>
#include<conio.h>
//using namespace std;
int main(){
    int m1[10][10],m2[10][10],mult[10][10],n,r,c,i,j;
    printf("enter the size of the array : ");
    scanf("%d",&n);
    printf("enter the rows and coloumn of matrix : ");
    scanf("%d %d",&r,&c);
    printf("enter element of first matrix : ");
    for(i=0;i<r;i++)
    {
        for(j=0;j<c;j++)
        {
            scanf("%d",m1[i][j]);
        }
    }
    printf("enter element of second matrix : ");
    for(i=0;i<r;i++)
    {
        for(j=0;j<c;j++)
        {
            scanf("%d",m1[i][j]);
        }
    }
    for(i=0;i<r;i++)
    {
        for(j=0;j<c;j++)
        {
            mult[i][j]=m1[i][j]*m2[i][j];
        }
    }
    for(i=0;i<r;i++)
    {
        for(j=0;j<c;j++)
        {
            printf("multipamdshfg %d",mult[i][j]);
        }
    }
    //getch();
    
}
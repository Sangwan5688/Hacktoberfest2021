#include<stdio.h>
int main()
{
    int n;
    int t1=0,t2=1;
    int nextterm=t1+t2;
    printf("enter the numbers you want to print : ");
    scanf("%d",&n);
    printf("the fibonaaci series is : %d, %d, ",t1,t2);
    for(int i=3;i<=n;i++){
        printf("%d, ",nextterm);
        t1=t2;
        t2=nextterm;
        nextterm=t1+t2;
    }
    return 0;
}
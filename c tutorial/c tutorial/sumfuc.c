#include<stdio.h>
int sum(int a,int b);
int sum(int a, int b)
{
    return a + b;
}
int main(){
    int x,y;
    printf("enter the number : ");
    scanf("%d",&x);
    printf("enter the number : ");
    scanf("%d",&y);
    int s=sum(x,y);
    printf("%d",s);
    return 0;
}
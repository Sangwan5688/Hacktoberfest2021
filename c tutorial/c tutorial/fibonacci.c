/*fibonacci*/
#include<stdio.h>
int fib(int n)
{
    if(n==0){
        return 0;
    }
    if(n==1){
        return 1;
    }
    int fibn=fib(n-1)+fib(n-2);
    printf("fibonacci of %d is : %d\n",n,fibn);
    return fibn;

}
int main(){
    int c;
    printf("enter the number : ");
    scanf("%d",&c);
    printf("series is : %d",fib(c));
    return 0;
}
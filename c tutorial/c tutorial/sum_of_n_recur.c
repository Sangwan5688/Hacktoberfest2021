/*sum of first n natural numbers using recursion*/
#include<stdio.h>
int sum(int n){
    if(n==1){
        return 1;
    }
    int a=sum(n-1)+n;
    return a;
}
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    printf("the sum of %d number is : %d \n",n,sum(n));
    return 0;
}
/*factorial of n*/
#include<stdio.h>
int facto(int n){
    if(n==1 || n==0){
        return 1;
    }
    int fact1=facto(n-1)*n;
    return fact1;
}
int main()
{
    int a;
    printf("enter the number : ");
    scanf("%d",&a);
    printf("the factorial of %d is : %d ",a,facto(a));
    return 0;
}
/*factorail using recursion*/
#include<stdio.h>
int fac(int a){
    if(a==1 || a==0 ){
        return 1;
    }
    int fac1=fac(a-1)*a;
    return fac1;
}
int main(){
    int c;
    printf("enter the number you want to factorial of : ");
    scanf("%d",&c);
    printf("The factorial of %d is : %d\n ",c,fac(c));
    return 0;
}
/* Write a program in C to calculate the sum of three numbers with
getting input in one line separated by a comma*/
#include<stdio.h>
int main(){
    int a,b,c;
    printf("enter three numbers : ");
    scanf("%d %d %d", &a, &b, &c);
    printf("sum of the numbers is : %d",a+b+c);
    return 0;
}
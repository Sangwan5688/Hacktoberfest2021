/*Write a C program to perform addition, subtraction, multiplication and  division of two numbers*/
#include<stdio.h>
int main(){
    int a,b;
    printf("input two numbers : ");
    scanf("%d %d",&a,&b);
    printf("the sum of two numbers are : %d\n",a+b);
    printf("the difference of two numbers are : %d\n",a-b);
    printf("the product of two numbers are : %d\n",a*b);
    printf("the quotient of two numbers are : %d\n",a/b);
    return 0;
}
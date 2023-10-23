/*Write a C program to accept two integers and check whether they are equal or not.*/
#include<stdio.h>
int main(){
    int a,b;
    printf("enter the first number : ");
    scanf("%d",&a);
    printf("enter the second number : ");
    scanf("%d",&b);
    if(a==b){
        printf("*****both numbers are equal*****");
    }else{
        printf("*****both are not equal*****");
    }
    return 0;
}
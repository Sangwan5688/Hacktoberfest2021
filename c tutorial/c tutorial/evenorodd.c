/*Write a C program to check whether a given number is even or odd*/
#include<stdio.h>
int main(){
    int a;
    printf("enter the number : ");
    scanf("%d",&a);
    if(a%2==0){
        printf("entered number is even");
    }else{
        printf("entered number odd");
    }
    return 0;
}
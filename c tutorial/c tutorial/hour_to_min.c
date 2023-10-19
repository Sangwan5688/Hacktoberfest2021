/*Write a C program that takes hours and minutes as input,
and calculates the total number of minutes*/
#include<stdio.h>
int main(){
    int a,b;
    
    printf("enter the hour : ");
    scanf("%d",&a);

    printf("enter the minute : ");
    scanf("%d",&b);
    int d=a*60+b;

    printf("total number of mintues are : %d",d);
    return 0;
}
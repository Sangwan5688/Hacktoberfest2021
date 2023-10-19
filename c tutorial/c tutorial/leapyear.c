/*Write a C program to find whether a given year is a leap year or not*/
#include<stdio.h>
int main(){
    int year;
    printf("enter the year : ");
    scanf("%d",&year);
    if(year%4==0){
        printf("%d year is a leap year",year);
    }else{
        printf("%d year is not a leap year",year);
    }
    return 0;
}
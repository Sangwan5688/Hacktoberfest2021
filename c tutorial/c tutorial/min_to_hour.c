/*Write a program in C that takes minutes as input, and display the total number of hours and minutes*/
#include<stdio.h>
int main(){
    int totalmin;
    printf("enter the minutes : ");
    scanf("%d",&totalmin);
    
    int min=totalmin%60;
    int hour=totalmin/60;
    
    
    printf("%d hours ,%d mins",hour, min);
    //printf("%d minutes",min);
    return 0;
}
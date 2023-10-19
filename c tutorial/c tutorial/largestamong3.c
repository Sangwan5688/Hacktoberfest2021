/*Write a C program to find the largest of three numbers*/
#include<stdio.h>
int main(){
    int a,b,c;
    printf("enter the first number : ");
    scanf("%d",&a);
    printf("enter the second number : ");
    scanf("%d",&b);
    printf("enter the third number : ");
    scanf("%d",&c);
    if(a>b){
        printf("%d is the largest number",a);
    }else if(b>c){
        printf("%d is the largest number",b);
    }else{
        printf("%d is the largest number",c);
    }
    return 0;
}
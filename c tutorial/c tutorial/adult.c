#include<stdio.h>
int main(){
    int age;
    printf("enter the age : ");
    scanf("%d",&age);
    age>=18 ? printf("this is adlut\n") : printf("this is not adult\n");
    return 0;
}
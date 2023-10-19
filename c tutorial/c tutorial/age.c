#include<stdio.h>
int main(){
    int age;
    printf("enter the age : ");
    scanf("%d",&age);
    if(age>18){
        printf("adult");
    }
    else{
        printf("not adult");
    }

}
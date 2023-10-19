#include<stdio.h>
int main(){
    int marks;
    printf("enter the marks : ");
    scanf("%d",&marks);
    if(marks>90){
        printf("A++");
    }
    else if(90>marks && marks>80){
        printf("A+");
    }else if(50<marks && marks<80){
        printf("A");
    }else{
        printf("you have to do your homework");
    }
    return 0;
}
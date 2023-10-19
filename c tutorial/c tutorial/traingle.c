/*. Write a C program to check whether a triangle can be formed by the given value for the angles*/
#include<stdio.h>
int main(){
    int a,b,c;
    printf("enter the first side of triangle : ");
    scanf("%d",&a);
    printf("enter the second side of triangle : ");
    scanf("%d",&b);
    printf("enter the third side of triangle : ");
    scanf("%d",&c);
    if(a+b+c==180){
        printf("****this is valid triangle****");
    }else{
        printf("****this is not a valid traingle*****");
    }
    return 0;
}
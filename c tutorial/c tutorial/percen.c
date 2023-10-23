/*Write a C program to check whether a triangle is Equilateral, Isosceles or Scalene.
Test Data :
50 50 60
Expected Output :
This is an isosceles triangle.*/
#include<stdio.h>
int main(){
    int a,b,c;
    printf("enter the first side : ");
    scanf("%d",&a);
    printf("enter the second side : ");
    scanf("%d",&b);
    printf("enter the third side : ");
    scanf("%d",&c);
    if(a==b && b==c){
        printf("this is a equilateral triangle");
    }else if(a != b && b != c && a != c){
        printf("this is a scalen triangle");
    }else if(a==b || b==c || a==c){
        printf("this is a isoceles triangle");
    }else{
        printf("thank you");
    }
    return 0;
}

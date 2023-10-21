#include<stdio.h>
int main(){
    int rad;
    printf("enter the radius : ");
    scanf("%d",&rad);


    float area=3.14*rad*rad; //here we have to use float beacuse of the 3.14 value of pi
    printf("area of the circle : %f",area); //here we have to use %f beacuse of float value
    return 0;

}
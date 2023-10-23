/* Write a program in C to find the square of any number using the function. Go to the editor
Test Data :
Input any number for square : 20
Expected Output :

The square of 20 is : 400.00*/
#include<stdio.h>
float sqr(float a);
float sqr(float a){
    return a*a;
}
int main(){
    int n;
    printf("Input any number for sqaure : ");
    scanf("%d",&n);
    float s=sqr(n);
    printf("the square of %d is : %f",n,sqr(n));
    return 0;
}
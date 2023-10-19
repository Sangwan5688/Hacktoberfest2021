/* Write a program in C to find the square of any number using the function. Go to the editor
Test Data :
Input any number for square : 20
Expected Output :

The square of 20 is : 400.00*/
#include<stdio.h>
int sqr(int a);
int sqr(int a){
    printf("%d",a*a);
}
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    sqr(n);
    return 0;
}
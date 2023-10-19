/*Write a program in C to display the n terms of odd natural number and their sum . Go to the editor
Test Data
Input number of terms : 10
Expected Output :
The odd numbers are :1 3 5 7 9 11 13 15 17 19
The Sum of odd Natural Number upto 10 terms : 100*/
#include<stdio.h>
int main(){
    int n,i,sum=0;
    printf("Input number of terms : ");
    scanf("%d",&n);
    printf("\nThe odd numbers are : ");
    for(int i=1;i<=n*2;i=i+2){
        printf("%d ",i);
        sum+=n;
    }printf("\nThe Sum of odd natural number upto %d terms : %d",n,sum);
    return 0;
}
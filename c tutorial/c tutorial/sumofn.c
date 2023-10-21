/* Write a program in C to display n terms of natural number and their sum.
Test Data : 7
Expected Output :
The first 7 natural number is :
1 2 3 4 5 6 7
The Sum of Natural Number upto 7 terms : 28*/
#include<stdio.h>
int main(){
    int i,n,sum=0;
    printf("Input value of terms : ");
    scanf("%d",&n);
    printf("The first %d natural number is : \n",n);
    for(int i=1;i<=n;i++){
        sum=sum+i;
        printf("%d ",i);
    }printf("\nThe sum of natural number upto %d terms : %d\n",n,sum);
    return 0;
}
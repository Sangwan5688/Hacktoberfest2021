/*Write a program in C to display the n terms of even natural number and their sum. Go to the editor
Test Data :
Input number of terms : 5
Expected Output :
The even numbers are :2 4 6 8 10
The Sum of even Natural Number upto 5 terms : 30*/
#include<stdio.h>
int main(){
    int n,sum=0;
    printf("Input number of terms : ");
    scanf("%d",&n);
    printf("The even number are : " );
    for(int i=1;i<=n;i++){
        
        printf(" %d ",2*i);
        sum+=2*i;
    }
    printf("\nthe sum of even natural number upto %d terms is : %d\n",n,sum);

    return 0;
}
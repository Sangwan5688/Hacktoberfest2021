/* Write a C program to find the sum of first 10 natural numbers. Go to the editor
Expected Output*/
#include<stdio.h>
int main(){
    int i,sum=0;
    printf("The first natural number is : \n");
    for(int i=1;i<=10;i++){
        sum =  sum + i;
        printf("%d ",i);

    }printf("\n The sum is : %d\n",sum);
    return 0;
}
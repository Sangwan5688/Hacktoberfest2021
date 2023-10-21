#include<stdio.h>
int main(){
    //first of all i am taking input by following command
    int a,b;
    //here i am printing a message which is display on the screen, we can also skip this
    printf("enter first number : ");
    //using scanf i am taking input of the number
    scanf("%d",&a);

    printf("enter second number : ");
    scanf("%d",&b);
    //creating a new variable in which i am storing the value of a+b , i am also do it directly
    int sum=a+b;
    //in this print i am also write a+b in the place of sum
    printf("sum is : %d",sum);
    //for zero error
    return 0;

}
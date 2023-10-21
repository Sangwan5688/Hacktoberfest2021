/* Write a program in C which is a Menu-Driven Program to perform a simple calculation*/
#include<stdio.h>
int main(){
    int a,b;
    int choice;
    printf("choose 1 for addition \n");
    printf("choose 2 for substraction \n");
    printf("choose 3 for product \n");
    printf("choose 4 for division \n");
    printf("enter your choice ");
    scanf("%d",&choice);
    switch(choice){
        case 1 :
                printf("enter the numbers : ");
                scanf("%d %d",&a,&b);
                printf("addtion of %d and %d is : %d",a,b,(a+b));
                break;
        case 2 :
                printf("enter the numbers : ");
                scanf("%d %d",&a,&b);
                printf("minus of %d and %d is : %d",a,b,(a-b));
                break;
        case 3 :
                printf("enter the numbers : ");
                scanf("%d %d",&a,&b);
                printf("product of %d and %d is : %d",a,b,(a*b));
                break;
        case 4 :
                printf("enter the nubmers : ");
                scanf("%d %d",&a,&b);
                printf("division of %d and %d is : %d",a,b,(a/b));
                break;
        default : printf("**********INVALID INPUT**********");
    }
    return 0;
}
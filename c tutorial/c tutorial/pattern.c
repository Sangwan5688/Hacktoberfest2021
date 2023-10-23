/*Write a program in C to display the pattern like right angle triangle using an asterisk.
The pattern like :
*
**
***
*****/
#include<stdio.h>
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            printf("*");
        }printf("\n");
    }
    return 0;
}
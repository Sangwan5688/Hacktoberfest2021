/*10. Write a program in C to display the pattern like right angle triangle with a number.
The pattern like :
1
12
123
1234*/
#include<stdio.h>
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            printf("%d ",j);
        }printf("\n");
    }
    return 0;
}
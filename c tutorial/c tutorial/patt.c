/*Write a program in C to make such a pattern like a pyramid with numbers increased by 1. 
   1 
  2 3 
 4 5 6 
7 8 9 10*/
#include<stdio.h>
int main(){
    int a=1,n;
    printf("enter the number : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        for(int j=n;j>=i;j--){
            printf(" ");
        }
        for(int k=1;k<=i;k++){
            printf("%d ",a);
            a+=1;
            
        }printf("\n");
    }
    return 0;
}
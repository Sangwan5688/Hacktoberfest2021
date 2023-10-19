/*Write a program in C to make such a pattern like a pyramid with numbers increased by 1. Go to the editor
   1
  2 2
 3 3 3
4 4 4 4 */
#include<stdio.h>
int main(){
    int n;
    printf("enter the number n : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        for(int j=n;j>=i;j--){
            printf(" ");
        }
        for(int k=1;k<=i;k++){
            printf("%d ",i);
        }printf("\n");
    }
    return 0;
}
/*Write a program in C to print the Floyd's Triangle. Go to the editor
1 
01
101 
0101 
10101
*/
#include<stdio.h>
int main(){
    int n;
    printf("enter the n : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        for(int j=1;j<=i;j++){
            int sum=i+j;
            if(sum%2==0){
                printf("1");
            }
            else{
                printf("0");
            }
            
        }printf("\n");
    }
    return 0;
}
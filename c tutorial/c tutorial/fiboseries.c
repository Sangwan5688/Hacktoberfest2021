/*fibonaci series loop*/
#include<stdio.h>
int main(){
    int n;
    int a=0,b=1,q=0;
    printf("enter the number till you want to print : ");
    scanf("%d",&n);
    for(int i=0;i<=n;i++){
        //int c=a+b;
        // int q=a+b;
        // int c=q+q;
        int a=b+a;


        
        printf("%d ",a);
    }
    
    return 0;
}
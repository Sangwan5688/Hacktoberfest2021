#include<stdio.h>
int main(){
    int a=0,b=1;
    
    int sum=a+b;
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    printf("the fibonacci series : %d, %d,",a,b);
    
    
    for(int i=3;i<=n;++i){
        printf(" %d,",sum);
        a=b;
        b=sum;
        sum=a+b;
    }


    return 0;
}
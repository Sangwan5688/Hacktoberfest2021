/*write a function which print table of any number inputed by user*/
#include<stdio.h>
void table(int a);
void table(int a){
    // int n;
    // printf("enter the value of n : ");
    // scanf("%d",&n);
    
    for(int i=1;i<=10;i++){
        printf("%d X %d = %d\n",a,i,a*i);

    
    }
}
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    table(n);
    return 0;
}
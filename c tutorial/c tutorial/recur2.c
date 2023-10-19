#include<stdio.h>
void what(int n){
    if(n==0){
        return;
    }
    printf("what the heck\n");
    what(n-1);
}
int main(){
    int a;
    printf("enter the number of times you want to print :");
    scanf("%d",&a);
    what(a);
    return 0;
}
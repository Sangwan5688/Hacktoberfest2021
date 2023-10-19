/*print all the odd number  form 5 to 50*/
#include<stdio.h>
int main(){
    // int n;
    // printf("enter the value of n : ");
    // scanf("%d",&n);

    for(int i=5;i<=50;i++){
        if(i%2==0){
            continue;
        }
        printf("%d \n",i);
    }
    return 0;
}
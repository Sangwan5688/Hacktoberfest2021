/*keep taking input numbers  as input from user untill  uers enters  an odd number         using """break"""*/
#include<stdio.h>
int main(){
    int n,odd;
    
    for(int i=1;i<=n;i++){
        printf("enter the number : ");
        scanf("%d",&n);
        if(odd=n%2!=0){
            break;
        }

    }
    printf("****end of code*****");
    return 0;
}
/*print the fatorial of a number n*/
#include<stdio.h>
int main(){
    int n,fac=1;
    printf("enter the number n : ");
    scanf("%d",&n);


    // for(int i=1;i<=n;i++){
    //     //printf("%d * ",i);
    //     fac*=i;
        
    // }

    
    for(int i=n;i>=1;i--){
        //printf("%d * ",i);
        fac*=i;
        
    }
    printf("%d ! = %d ",n,fac);
    return 0;
}
/*print all numbers from 1 to 10 expect for 6 */
#include<stdio.h>
int main(){
    int n;
    printf("enter the number : ");
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        if(i==6){
            continue;
        }
        printf("%d \n",i);
    }
    return 0;
}
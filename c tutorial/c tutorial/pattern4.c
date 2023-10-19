/* Write a program in C to make such a pattern like a pyramid with numbers increased by 1.
   * 
  * * 
 * * * 
* * * *
 */
#include<stdio.h>
int main(){
    //int a=0;
    for(int i=1;i<=4;i++){
        for(int j=4;j>=i;j--){
            printf(" ");
        }
        for(int k=1;k<=i;k++){
        printf("* ");
    }printf("\n");
    }

    
    return 0;
}
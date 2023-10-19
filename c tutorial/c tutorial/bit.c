#include<stdio.h>
int main(){
    unsigned int a=105; //01101001
    unsigned int b=156; //10011100
    unsigned int res1,res2,res3,res4;
    res1=a|b;
    res2=a&b;
    res3=a^b; //11110101
    res4=a<<2; 
    printf("a|b : %d, a&b : %d, a^b : %d, ~a : %d",res1,res2,res3,res4);
    return 0;
}
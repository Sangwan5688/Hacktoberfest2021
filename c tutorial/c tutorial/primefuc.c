/*Write a program in C to check whether a number is a prime number using the function.
Test Data :
Input a positive number : 5
Expected Output :

The number 5 is a prime number.*/
#include<stdio.h>
int pri(int a);
int pri(int a){
    if(a%a==0 && a%1==0 && ){
        printf("The number %d is a prime number.",a);// this is a wronge code ??  
    }else{                                            // this is a wronge code ??  
        printf("The number %d is not a prime number.",a); // this is a wronge code ??  
    }                                       // this is a wronge code ??  
                                          // this is a wronge code ??  
}                                     // this is a wronge code ??  
int main(){                               // this is a wronge code ??  
    int n;
    printf("Input a positive number : ");
    scanf("%d",&n);          // this is a wronge code ??  
    pri(n);       // this is a wronge code ??  

    return 0;
}
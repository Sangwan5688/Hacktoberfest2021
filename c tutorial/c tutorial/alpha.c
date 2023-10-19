/*Write a C program to check whether an alphabet is a vowel or consonant*/
#include<stdio.h>
int main(){
    char any;
    printf("enter any alphabet : ");
    scanf("%c",&any);
    if(any=='a' || any=='e' || any=='i' || any=='o' || any=='u' || any=='A' || any=='E' || any=='I' || any=='O' || any=='U'){
        printf("%c is a vowel",any);
    }else{
        printf("this a consonent");
    }
    return 0;
}
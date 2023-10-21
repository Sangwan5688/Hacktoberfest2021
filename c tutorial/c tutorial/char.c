/* Write a C program to check whether a character is an alphabet, digit or special character*/
#include<stdio.h>
int main(){
    char any_char;
    printf("input a character : ");
    scanf("%c",&any_char);
    if((any_char>='a' && any_char<='z') || (any_char>='A' && any_char<='B')){
        printf("this is an alphabet\n");
    }else if(any_char>=0 && any_char<=9){
        printf("this is a digit\n");
    }else{
        printf("this is a special charecter");
    }
    return 0;
}
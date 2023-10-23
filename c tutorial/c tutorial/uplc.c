/*write a program to find entered char is upper or lower*/
#include<stdio.h>
int main(){
    char ch;
    printf("enter your char : ");
    scanf("%c",&ch);
    if(ch>='a' && ch<='z'){
        printf("you entered small char");
    }else if(ch>='A' && ch<='Z'){
        printf("you entered capital char");
    }else{
        printf("invalid char");
    }
    return 0;
}
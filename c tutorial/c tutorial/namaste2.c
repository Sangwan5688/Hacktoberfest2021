#include<stdio.h>
void namaste();
void namaste(){
    printf("namaste\n");
}
void bonjour();
void bonjour(){
    printf("bonjour\n");
}

int main(){
    char ch;
    printf("enter 'i' for indian and 'f' for french : ");
    scanf("%c",&ch);
    if(ch=='i'){
        namaste();
    }else if(ch=='f'){
        bonjour();
    }else{
        printf("*******ERROR********");
    }
    return 0;
}
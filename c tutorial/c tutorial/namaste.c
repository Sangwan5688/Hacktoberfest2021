#include<stdio.h>
char i;
void fuc();
void fuc(){
    printf("choose 'i' or 'f' : ");
    scanf("%c",&i);
    if(i =='i'){
        printf("namaste");
    }else if(i=='f'){
        printf("bonjour");
    }else{
        printf("******ERROR******");
    }
    
}
int main(){
    fuc();
    return 0;
}
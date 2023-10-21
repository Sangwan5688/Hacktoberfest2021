/*write 2 function one to print "hello " and second to print "good bye" */
#include<stdio.h>
void printhello();
void printgood_bye();

int main(){
    printhello();
    printgood_bye();
    return 0;

}

void printhello(){
    printf("hello\n");
}

void printgood_bye(){
    printf("good bye\n");
}
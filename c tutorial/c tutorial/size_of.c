#include<stdio.h>
int main(){
    printf("variable of type char occupy %u\n",sizeof(char));
    printf("variable of type int occupy %u\n",sizeof(int));
    printf("variable of type long occupy %u\n",sizeof(long));
    printf("variable of type long long occupy %u\n",sizeof(long long));
    printf("variable of type double occupy %u\n",sizeof(double));
    printf("variable of type float occupy %u\n",sizeof(float));
    printf("variable of type long double occupy %zd",sizeof(long double));
    return 0;
}
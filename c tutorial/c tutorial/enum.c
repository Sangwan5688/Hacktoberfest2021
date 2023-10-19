#include<stdio.h>

int main(){
    enum company {GOOGLE ,FACEBOOK ,XEROX ,YAHOO ,EBAY ,MICROSOFT};
    enum company x=XEROX; // HERE x is a variable
    enum company g=GOOGLE;
    enum company e=EBAY;
    printf("the value of xerox is : %d\n",x);
    printf("the value of google is : %d\n",g);
    printf("the value of ebay is : %d\n",e);
    return 0;
}
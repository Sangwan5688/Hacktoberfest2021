#include<stdio.h>
int main(){
    _Bool a=1;
    _Bool b=0;
    
    _Bool res1=a&&b;
    _Bool res2=a||b;

    printf("%d %d",a&&b,a||b);
    return 0;
}
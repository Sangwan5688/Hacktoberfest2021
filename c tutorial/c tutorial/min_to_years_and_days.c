#include<stdio.h>
int main(){
    int min;
    double year,days;
    printf("enter the number of minutes : ");
    scanf("%d",&min);
    year=min/((float)365*24*60);
    days=min/((float)24*60);
    printf("%d minutes is approx %f years and %f days\n",min,year,days);
    return 0;
}


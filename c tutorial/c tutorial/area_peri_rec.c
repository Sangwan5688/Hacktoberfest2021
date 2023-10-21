#include<stdio.h>
int main(){
    double length,width;
    printf("enter the length of the rectangle : ");
    scanf("%lf",&length);
    printf("enter the width of the rectangle : ");
    scanf("%lf",&width);
    double peri=2*(length+width);
    double area=length*width;
    printf("the perimeter of the rectangle is : %lf\n",peri);
    printf("the area of the rectangle is : %lf\n",area);
    return 0;
}
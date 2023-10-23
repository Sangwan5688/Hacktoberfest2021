/* Write a C program to accept a coordinate point in a XY coordinate system
and determine in which quadrant the coordinate point lies.*/
#include<stdio.h>
int main(){
    int x,y;
    printf("enter the x cordinate : ");
    scanf("%d",&x);
    printf("enter the y cordinate : ");
    scanf("%d",&y);
    if(x>0 && y>0){
        printf("%d %d are in first quadrant",x,y);
    }else if(x<0 && y<0){
        printf("%d %d are in third quadrant",x,y);
    }else if(x>0 && y<0){
        printf("%d %d are in fourth quadrant",x,y);
    }else{
        printf("%d %d are in second quadrant",x,y);
    }
    return 0;
}
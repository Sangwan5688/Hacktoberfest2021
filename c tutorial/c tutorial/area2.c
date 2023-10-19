/*Write a program in C which is a Menu-Driven Program to compute the area of the various
geometrical shape.*/
#include<stdio.h>
int main(){
    int choice,r,l,w,b,h;
    float area;
    printf("Input 1 for circle \n");
    printf("Input 2 for rectangle  \n");
    printf("Input 3 for triangle  \n");
    printf("Enter your choice : ");
    scanf("%d",&choice);
    switch(choice){
        case 1 :
                printf("Input radius of circle : ");
                scanf("%d",&r);
                area = 3.14*r*r;
                printf("area of the circle is : %f",area);
                break;
        case 2 :
                printf("Input length and width of the reactangle : ");
                scanf("%d %d",&l,&w);
                area=l*w;
                printf("area of the rectangle is : %f",area);
                break;
        case 3 :
                printf("Input base and height of the triangle : ");
                scanf("%d %d",&b,&h);
                area=(1/2)*b*h;
                printf("area of the triangle is : %f",area);
                break;
        default : printf("*****INVALID INPUT*****");
    }
    return 0;
}
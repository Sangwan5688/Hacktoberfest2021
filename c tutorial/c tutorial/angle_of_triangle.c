//Write a C program to find the third angle of a triangle if two angles are given
#include<stdio.h>
int main(){
    int ang1,ang2;
    printf("enter first angle : ");
    scanf("%d",&ang1);
    
    printf("enter second angle : ");
    scanf("%d",&ang2);

    printf("third angle of the triangle is : %d",180-(ang1+ang2));
    return 0;
}
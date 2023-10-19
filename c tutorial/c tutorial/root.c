/*Write a C program to calculate the root of a Quadratic Equation. Go to the editor
Test Data : 1 5 7
Expected Output :
Root are imaginary;
No solution.*/
#include<stdio.h>
#include<math.h>
int main(){
    int a,b,c; //ax^2+bx+c
    printf("enter the a : ");
    scanf("%d",&a);
    printf("enter the b : ");
    scanf("%d",&b);
    printf("enter the c : ");
    scanf("%d",&c);
    int d=b*b;
    //printf("%d\n",d);
    int e=-4*a*c;
    //printf("%d\n",e);
    int f=d+e;
    //printf("%d\n",f);
    if(f>=0){
        printf("*****solution exist*****");
    }else{
        printf("******NO solutions******");
    }
    return 0;
}
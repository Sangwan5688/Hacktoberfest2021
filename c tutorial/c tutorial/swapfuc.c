/*Write a program in C to swap two numbers using function. Go to the editor
Test Data :
Input 1st number : 2
Input 2nd number : 4
Expected Output :

Before swapping: n1 = 2, n2 = 4                                                  
After swapping: n1 = 4, n2 = 2 */
#include<stdio.h>
int swap(int a,int b);
int swap(int a,int b){
    //int a,b;
    printf("Before swapping: n1= %d,n2= %d\n",a,b);
    printf("after swapping: n1= %d,n2= %d",b,a);
}
int main(){
    int a,b;
    printf("enter the number one : ");
    scanf("%d",&a);
    printf("enter the number two : ");
    scanf("%d",&b);
    swap(a,b);
    return 0;
}
/*Write a program in C to check a given number is even or odd using the function. Go to the editor
Test Data :
Input any number : 5
Expected Output :

 The entered number is odd.*/
#include<stdio.h>
int ed(int a);
int ed(int a){
    if(a%2==0){
        printf("The entered number is even. ");
    }else{
        printf("the entered nubmer is odd. ");
    }
}
int main(){
    int n;
    printf("Input any number : ");
    scanf("%d",&n);
    ed(n);

    return 0;
}
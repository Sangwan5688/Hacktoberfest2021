/* Write a program in C to read 10 numbers from keyboard and find their sum and average. Go to the editor
Test Data :
Input the 10 numbers :
Number-1 :2
...
Number-10 :2
Expected Output :
The sum of 10 no is : 55
The Average is : 5.500000*/
#include<stdio.h>
int main()
{
    int n,sum=0;
    float avg;
    printf("Input the 10 number : \n");
    for(int i=1;i<=10;i++){
        printf("Number-%d :",i);
        scanf("%d",&n);
        sum+=n;
    }
    avg=sum/10.0;
    printf("The sum of 10 no is : %d\nThe average of the number is : %f",sum,avg);
    
    return 0;
}
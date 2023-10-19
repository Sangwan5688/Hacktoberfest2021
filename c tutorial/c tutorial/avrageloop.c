/* Write a program in C to read 10 numbers from keyboard and find their sum and average.
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
    int i,num,sum=0;
    float average;
    printf("Input the 10 numbers : \n");
    for(int i=1;i<=10;i++)
    {
        printf("Number-%d ",i);
            
        scanf("%d",&num);
        sum+=num;
        
    }
    average=sum/10.0;
    printf("The sum of 10 numbers is : %d",sum);
    printf("\nThe Average is %f",average);
    return 0;
}
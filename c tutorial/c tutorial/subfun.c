/*write a function to calculate percentage of a student from marks in science , maths , sanskrit
and calcultae its percentage*/
#include<stdio.h>
float submarks(float a,float b,float c)
{
    // float sum=a+b+c;
    // float div=sum/300;
    // float mul=div*100;
    // return mul;
    return ((a+b+c)/300)*100;
}
int main()
{
    float s,m,sans;
    printf("enter the marks of science : ");
    scanf("%f",&s);
    printf("enter the marks of maths : ");
    scanf("%f",&m);
    printf("enter the marks of sanskrit : ");
    scanf("%f",&sans);
    printf("the percentage is : %f percentage ",submarks(s,m,sans));
    return 0;
}
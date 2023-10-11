#include<stdio.h>

void main()
{
int a,b,sum,sub,mul,div;
char operator;
printf("Enter Operator\n");
scanf("%c",&operator);
printf("Enter 2 operands\n");
scanf("%d%d",&a,&b);
switch(operator)
{
case '+':
sum=a+b;
printf("sum=%d\n",sum);
break;
case '-':
sub=a-b;
printf("sub=%d\n",sub);
break;
case '*':
mul=a*b;
printf("mul=%d\n",mul);
break;
case '/':
div=a/b;
printf("div=%d\n",div);
break;
default:
printf("Enter Valid Operator");
}
}

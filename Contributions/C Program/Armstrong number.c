#include<stdio.h>
#include<math.h>
int main()
{
	int num,s=0,digit,copy;
	printf("Enter the number: ");
	scanf("%d",&num);
	copy=num;
	while(num!=0)
	{
		digit=num%10;
		s+=pow(digit,3);
		num=num/10;
	}
	if(s==copy)
	printf("%d is a Armstrong number",copy);
	else
	printf("%d is not a Armstrong number",copy);
	return 0;
}

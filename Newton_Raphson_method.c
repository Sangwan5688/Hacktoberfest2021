// This is the code to find the root of approximation for the root of a real-valued function
#include<stdio.h>
#include<math.h>

double func(double x)
{
	return 3*x - cos(x) - 1;
}

double derivFunc(double x)
{
	return 3 + sin(x);
}


int main()
{
	double x0,e, x1, f0, f1, df0;
	int i = 0;

	printf("Enter the initial guess and the epsilon value : ");
	scanf("%lf%lf",&x0,&e);

	do{
		f0 = func(x0);
		f1 = func(x1);
		df0 = derivFunc(x0);
		x1 = x0 - (f0/df0);
		x0 = x1;
	i++;	
	}while(fabs(f1) > e);

	printf("Root = %.4lf\t", x1);
	return 0;
}


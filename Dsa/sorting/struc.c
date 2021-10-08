#include <stdio.h>
#include <stdlib.h>
struct Employee{
	char name[50];
	int id;
	int salary;
	int gross;
	int da;
	int hra;
};
int main() {
	int n,i,totgross;
	printf("Enter the number of employees\n");
	scanf("%d",&n);
	struct Employee e[n];
	struct Employee *p;
	p=&e[n];
	for(i=0;i<n;i++)
    {
    	printf("Enter the name of employee %d\n",i+1);
    	scanf("%s",e[i].name);
    	printf("Enter the id of employee %d\n",i+1);
    	scanf("%d",&e[i].id);
    	printf("Enter the salary of employee %d\n",i+1);
    	scanf("%d",&e[i].salary);
    }
    for(i=0;i<n;i++){
	
    	e[i].da=(80*e[i].salary)/100;
    	e[i].hra=(10*e[i].salary)/100;
    	e[i].gross=e[i].salary+e[i].da,e[i].hra;
    	totgross+=e[i].gross;
		}
	printf("Total gross : %d\n",totgross);
		return 0;
}

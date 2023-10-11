#include<stdio.h>
main()
{
	int i,n,j,a[100],choice,ele,pos;
	
	printf("how many elements are enter :");
	scanf("%d",&n);
	
	for(i=0; i<n; i++)
	{
		scanf("%d",&a[i]);
	}

	do
	{
		
		
		printf("\n press 1 for insert array \n press 2 for delete array \n press 3 for update array \n press 4 for print array \n press 0 for exit array :");
		scanf("%d",&choice);
		
		
		switch(choice)
		{
			case 1:
				
				
				printf("enter element : ");
				scanf("%d",&ele);
				
				printf("enter position : ");
				scanf("%d",&pos);
				
				if(pos<=n)
				  {
					for(i=n-1; i>=pos-1; i--)
					{
						a[i+1] = a[i];
					}
	
					a[pos-1] = ele;
					n++;
					}
			        else
			        {
			        	printf("\nEnter Valid Position ..\n");
					}
					break;
					
			case 2 : 
			
						printf("Enter Position : ");
						scanf("%d",&pos);
						
						if(pos<=n)
	                	{
	                		for(i=pos-1; i<n; i++)
							{
								a[i] = a[i+1];
							}	
							n--;
						}
						else
						{
							printf("\nEnter Valid Position ..\n");
						}
						break;
			case 3 :
			
			
						printf("Enter Position : ");
						scanf("%d",&pos);
	
						printf("Enter Elements : ");
	 					scanf("%d",&ele);
	
	                	if(pos<=n)
	                	{
	           			 	a[pos-1] = ele;
						}
   						else
						{
							printf("\nEnter Valid Position ..\n");
						}
						break;
			
			case 4:
						for( i=0 ; i<n ; i++)	
						{
							printf("%d ",a[i]);
						}					
						
						break;
		}		
	}while(choice != 0);
	
}

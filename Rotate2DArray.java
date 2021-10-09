
public class Rotate2DArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Scanner scn = new Scanner(System.in);
		int n = scn.nextInt();
		
		int arr[][] = new int[n][n];
		
		for(int i=0;i<arr.length;i++)
		{
			for(int j=0;j<arr[0].length;j++)
			{
				arr[i][j] = scn.nextInt();
			}
		}
		
		//transpose
		for(int i=0;i<arr.length;i++)
		{
			for(int j=i;j<arr[0].length;j++)
			{
				
				int temp = arr[i][j];
				arr[i][j] = arr[j][i];
				arr[j][i] = temp;
			}
		}
		
		System.out.println("transpose");
		for(int i=0;i<arr.length;i++)
		{
			for(int j=0;j<arr[0].length;j++)
			{
				System.out.println(arr[i][j]); 
			}
		}
		
	
		// reverse
		System.out.println("reverse");
		for(int i=0;i<arr.length;i++)
		{
				int start =0;
				int end = arr.length -1;
				
				while(start < end)
				{
					
					int temp= arr[i][start];
					arr[i][start] = arr[i][end];
					arr[i][end] = temp;
					start ++;
					end --;
				}
		}
		
		print(arr);
			
	}
	
	public static void print(int arr[][])
	{
		for(int i=0;i<arr.length;i++)
		{
			for(int j=0;j<arr[0].length;j++)
			{
				System.out.println(arr[i][j]); 
			}
		}
	}

}

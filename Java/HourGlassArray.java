package problemSolvingHR;

import java.util.Scanner;

public class HourGlassArray {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
				
		// Data entry in array
		int [][] arr= new int[6][6];
		for(int i=0; i<6;i++) {
			for(int j=0;j<6;j++) {
				arr[i][j]=sc.nextInt();
			}
		}sc.close();
		
		int rows=arr.length;
		int columns=arr[0].length;
		int max_sum=-63;
		
		//Finding hourglass sum
		for(int i=0;i<rows-2;i++) {
			for(int j=0;j<columns-2;j++) {
				int sum=arr[i][j] + arr[i][j+1] + arr[i][j+2] + arr[i+1][j+1] +
						arr[i+2][j] + arr[i+2][j+1] + arr[i+2][j+2];
				max_sum=Math.max(max_sum, sum);
			}
		}
		System.out.println(max_sum);
		
		
		
		
		

	}

}
 
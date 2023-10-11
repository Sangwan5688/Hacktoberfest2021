package problemSolvingHR;

import java.util.Scanner;

public class BinaryConversion {

	public static void main(String[] args) {
		// Convert to binary & check the no of occurrence of 1
		Scanner sc=new Scanner(System.in);
		int n=sc.nextInt();
		sc.close();
		
		String binary=Integer.toBinaryString(n);
		System.out.println(binary);
		
		//Check the no of consecutive occurrence of 1
		int count=0,max=0;
		char [] elements=binary.toCharArray();
		for(int i=0;i<binary.length();i++) {
			if(elements[i] == '1') {
				count ++;
			}
			else {
				count=0;
			}
			if(max < count) {
				max = count;
				}
		}
		System.out.println(max);
		
	}

}

/*
	This program prints the given array in reversed array.
*/

import java.util.*;
import java.lang.*;
import java.io.*;

public class ReverseIntArray {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();		// Take the number of elements in the array as input
        ArrayList<Integer> al = new ArrayList<Integer>();
        for(int i=0;i<n;i++) {
        	al.add(scan.nextInt());		// Take the array elements as input
        }
        // Iterate the array from last to first to print the array in reverse order
        for(int i=al.size()-1;i>=0;i--) {
        	System.out.print(al.get(i) + " ");
        }
    }
}

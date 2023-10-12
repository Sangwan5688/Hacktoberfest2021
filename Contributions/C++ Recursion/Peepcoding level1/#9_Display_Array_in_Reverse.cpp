/* 
    TODO: Display Array in Reverse
    ? https://www.hackerearth.com/practice/data-structures/arrays/1-d/practice-problems/algorithm/print-array-in-reverse/
 */

import java.util.*;
class TestClass {
    public static void pre(int arr[], int index) {
        int n = arr.length;
        if(index >= (n+1)/2) return;
        // Collections.swap(arr[index], arr[n - index - 1]);
        int temp = arr[index];
        arr[index] = arr[n - index - 1];
        arr[n - index - 1] = temp;

        pre(arr,index+1);
    }
    public static void main(String args[] ) throws Exception {
        Scanner sc = new Scanner(System.in);
        int n;
        n = sc.nextInt();
        int arr[] = new int[n];
        for(int i=0;i<n;i++) arr[i] = sc.nextInt();

        pre(arr,0);
        for(int value : arr) System.out.println(value);
    }
}

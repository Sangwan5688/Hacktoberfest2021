import java.util.Arrays;

public class ex52 {
    public static void main(String[] args) {
        int[] arr = new int[]{5,4,3,2,1};
        for (int i : arr) System.out.print(i + " ");
        System.out.println();
        
        Arrays.sort(arr,2,5);
        for (int i : arr) System.out.print(i + " ");
        System.out.println();
        
        Arrays.sort(arr);
        for (int i : arr) System.out.print(i + " ");
        System.out.println();
        
        int ind = Arrays.binarySearch(arr,2);
        System.out.println(ind);
        
        Arrays.fill(arr, 0, 3, 45);
        for (int i : arr) System.out.print(i + " ");
        System.out.println();

        
    }
}

public class MoveZerosToEnd {
    public static void main(String[] args) {
        int[] arr = {0, 2, 0, 4, 0, 6, 0, 8, 10, 0};

        int n = arr.length;

        // Move non-zero elements to the front
        int index = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] != 0) {
                arr[index] = arr[i];
                index++;
            }
        }

        // Fill the rest of the array with zeros
        while (index < n) {
            arr[index] = 0;
            index++;
        }

        // Print the modified array
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}

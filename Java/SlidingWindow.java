public class SlidingWindow {
    public static int maxSubarraySum(int[] arr, int windowSize) {
        Queue<Integer> queue = new LinkedList<>();
        int maxSum = 0;
        int currentSum = 0;

        for (int i = 0; i < arr.length; i++) {
            if (queue.size() == windowSize) {
                currentSum -= queue.poll();
            }

            queue.add(arr[i]);
            currentSum += arr[i];

            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int windowSize = 3;

        int maxSum = SlidingWindow.maxSubarraySum(arr, windowSize);

        System.out.println("The maximum subarray sum is: " + maxSum);
}

}

package main.cp.leetcode.august;

import java.util.Arrays;
import java.util.List;

public class Day_12_Pascals_Triangle_II {
    // 1. Naive solution O(k^2) time and O(k) space
    class Solution {
        public List<Integer> getRow(int rowIndex) {
            Integer[] result = new Integer[rowIndex + 1];
            Arrays.fill(result, 0);
            result[0] = 1;
            for (int i = 1; i <= rowIndex; i++)
                for (int j = i; j > 0; j--)
                    result[j] = result[j] + result[j - 1];

            return Arrays.asList(result);
        }
    }

    // 2. Using Combinatorics solution O(k) time and O(k) space
    class Solution2 {
        public List<Integer> getRow(int rowIndex) {
            Integer[] result = new Integer[rowIndex + 1];
            result[0] = 1;
            for (int i = 1; i < result.length; i++)
                result[i] = (int) ((long) result[i - 1] * (rowIndex - (i - 1)) / (i));

            return Arrays.asList(result);
        }
    }
}

/* 
    TODO: Equal Sum Subsets Partition
    ? https://www.onlinegdb.com/online_java_compiler
 */

import java.util.*;

public class Main {
    public static void pre(int[] arr, int idx, int n, int k, int[] subsetSum, int filled, 
        ArrayList<ArrayList<Integer>> ans) {
        if(idx == arr.length) {
            if(filled == k) {
                boolean flag = true;
                for(int i=0;i<subsetSum.length-1;i++) {
                    if(subsetSum[i] != subsetSum[i+1]) {
                        flag = false;
                        break;
                    }
                }
                
                if(flag) {
                    for(ArrayList<Integer> list : ans) {
                        System.out.print(list + " ");
                    }
                    System.out.println();
                }
            }
            return;
        }
        
        for(int i=0;i<ans.size();i++) {
            if(ans.get(i).size() > 0) {
                ans.get(i).add(arr[idx]);
                subsetSum[i] += arr[idx];
                pre(arr, idx+1, n, k, subsetSum, filled, ans);
                subsetSum[i] -= arr[idx];
                ans.get(i).remove(ans.get(i).size() - 1);
            } else {
                ans.get(i).add(arr[idx]);
                subsetSum[i] += arr[idx];
                pre(arr, idx+1, n, k, subsetSum, filled+1, ans);
                subsetSum[i] -= arr[idx];
                ans.get(i).remove(ans.get(i).size() - 1);
                break;
            }
        }
    }

    public static void main(String[] args) {
        Scanner fs = new Scanner(System.in);

        int n = fs.nextInt(), sum = 0;
        int[] arr = new int[n];

        for(int i=0;i<n;i++) {
            arr[i] = fs.nextInt();
            sum += arr[i];
        }

        int k = fs.nextInt();
        
        if(k == 1) {
            System.out.print("[");
            for(int i=0;i<n;i++) {
                System.out.print(arr[i] +", ");
            }
            System.out.print("]");
            return;
        }

        if(k > n || sum%k != 0) {
            System.out.println(-1);
            return;
        }

        int[] subsetSum = new int[k];
        ArrayList<ArrayList<Integer>> ans = new ArrayList<>();
        for(int i=0;i<k;i++) ans.add(new ArrayList<>());

        pre(arr,0,n,k,subsetSum,0,ans);
    }
}

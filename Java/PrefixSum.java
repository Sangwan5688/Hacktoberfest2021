import java.util.*;

public class PrefixSum{

  public static int prefixSum(int[] arr, int start, int end){
    int[] sumArray = new int[arr.length];
    sumArray[0] = arr[0];
    for(int i = 1; i < arr.length; i++){
      sumArray[i] = sumArray[i-1] + arr[i];
    }
    if(start!=0){
      return sumArray[end-1]-sumArray[start-1];
    }
    return sumArray[end-1];
  }

}

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class SubsequenceThroughRecursion {
 
 static void solve(Integer arr[], ArrayList<Integer> output,int index, ArrayList<ArrayList<Integer>> ans ){
      //base condition
      if(index>=arr.length){
        ans.add(output);
        
        return;
      }
      
      //now call for exclude
      solve(arr,output,index+1,ans);
      
      //now call for include
      
      Integer num = arr[index];
      
      output.add(num);
      
      solve(arr, new ArrayList<>(), index+1, ans); 
      out = out.
      
 }
 
    public static void main(String[] args) {
    ArrayList<ArrayList<Integer>> ans = new ArrayList<>();
    Integer arr[] =  new Integer[]{1,2,3};
    ArrayList<Integer> output = new ArrayList<>();
    int index=0;
    solve(arr,output,index,ans);
    System.out.println(ans);
 }   
}

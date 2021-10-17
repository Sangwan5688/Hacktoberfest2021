
public class MergeTwoSortedArray {
  
    public static void main(String[] args){
    int[] arr1 = {2,4,6,8,10};
    int[] arr2 = {12,16,20,50};
      System.out.println(merge(arr1,arr2));
      }

    public static int[] merge(int arr1[], int arr2[]) {
        int ans[] = new int[arr1.length+arr2.length];
		int i = 0; 
		int j =0;
		int k =0;
		while(i<arr1.length && j < arr2.length) {
			if(arr1[i] < arr2[j] ){
				ans[k] = arr1[i];
				k++;
				i++;
			}else {
				ans[k] = arr2[j];
				k++;
				j++;
			}
		}
		while(i<arr1.length) {
			ans[k] = arr1[i];
			k++;
			i++;
		}
		while(j < arr2.length) {
			ans[k] = arr2[j];
			k++;
			j++;
		}
		return ans;
    }

}

public class CycleRotateArray {
	
	public static void main(String[] args) {
		int array[] = {1,2,3,4,5};
		int n = array.length;
		cycleRotateArray(array,n);
	}

	private static void cycleRotateArray(int[] array, int n) {
		// TODO Auto-generated method stub
		int temp;
		int first_index = 1;
		int second_index = 2;
		
		temp = array[0];
		array[0] = array[n - 1];
		array[n - 1] = temp;
		
		for(int i = n - 1; i > 1; i--) {
			temp = array[n - first_index];
			array[n - first_index] = array[n - second_index];
			array[n - second_index] = temp;
			first_index++;
			second_index++;
		}
		
		for(int ele : array) {
			System.out.print(ele);
		}
	}

}
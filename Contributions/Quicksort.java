public class Quicksort{

    public static void swap(int[] array, int i, int j){
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    /**
     * Sort Algorithm Quicksort
     */
    public static void quicksort(int[] array){
        quicksort(array, 0, array.length-1);
    }

    /**
     * Sort Algorithm Quicksort
     * @param int left start of array to be sorted
     * @param int right end of array to be sorted
     */
    public static void quicksort(int[] array, int left, int right){
        int i = left, j = right;
        int pivo = array[(right+left)/2];
        while(i <= j){
            while(array[i] < pivo) i++;
            while(array[j] > pivo) j--;
            if(i <= j){
                swap(array, i, j);
                i++;
                j--;
            }
        }
        if(left < j) quicksort(array, left, j);
        if(i < right) quicksort(array, i, right);
    }

    public static void show_array(int[] array){
        System.out.print("[ ");
        for(int i = 0; i < array.length; i++){
            System.out.print(array[i] + " ");
        }
        System.out.println("]");
    }

    public static void main(String[] args) throws Exception{
        int[] array = { 7, 5, 4, 6, 1, 3, 8, 2};

        //Shows array before sorting
        show_array(array);

        quicksort(array);

        //Shows array after sorting
        show_array(array);
    }

}
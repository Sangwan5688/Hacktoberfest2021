class BubbleSortingAlgorithm {

    static void bubbleSorting(int arrayNumber[])
    {
        int n = arrayNumber.length; 
        int temp=0;
        for (int i = 0; i < n; i++){
            for (int j = 1; j < (n - i); j++){
                if (arrayNumber[j-1] > arrayNumber[j]) {

                    // the element will be swapped using the swapping method below
                    temp = arrayNumber[j-1];
                    arrayNumber[j-1] = arrayNumber[j];
                    arrayNumber[j] = temp;

      }
    }
 }
}        

    // This is the main method to test run the bubbleSorting implementation logic

    public static void main(String args[])
    {
        int arrayVariable[] = {10, 50, 110, 90, 1, 9, 200, 4, 2000};
        System.out.println("This is the Array values before Sorting")
        for(int i=0; i < arrayVariable.length; i++){
          System.out.print(arrayVariable[i] + " ")
    }
       System.out.print();    

        // Sorting the elements using Bubble Sorting Algorithm
        bubbleSorting(arrayVariable);
        System.out.println("This is the value of the Array after Sorting");
        for(int i=0; i < arrayVariable.length; i++){
        System.out.print(arrayVariable[i] + " ")
       }
    }
}

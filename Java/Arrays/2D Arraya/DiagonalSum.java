public class DiagonalSum {

  static int findSum(int[][] arr){

    int sum=0;

    for(int i=0; i<arr.length; i++){

      for(int j=0; j<arr[i].length; j++){

        if(i==j || (i+j)==arr[i].length-1){

          sum+=arr[i][j];

        }

      }

    }return sum;

  }

  public static void main(String[] args) {

    int[][] arr={

      {7,3,1,9},

      {3,4,6,9},

      {6,9,6,6},

      {9,5,8,5}

    };

    System.out.print(findSum(arr));

  }

}


class Main {
  public static void main(String[] args) {
    int one = 1;
    int two = 2;
    if (one == two) {
      System.out.println("they are equal!");
    } else {
      if (one > two) {
        System.out.println("one is greater than two");
      } else {
        System.out.println("two is greater than one");
      }
    }
    int int1 = 3*3+1;
    int int2 = 4*2;
    if (int1 == int2) {
      System.out.println("These integers are the same");
    }
    else {
      System.out.println("These integers aren't the same");
    }
    while (int2 < int1) {
      System.out.println("Int2 is still less than int1");
      int2++; //Adds one to int2
    }
  }
}

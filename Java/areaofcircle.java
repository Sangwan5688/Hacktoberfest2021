import java.util.Scanner;
class Area
{ 
    public static void main (String[] args)
  {
    final double PI=3.14,area;
    int r;
    System.out.print("Enter the radius of the circle ");
    Scanner ref = new Scanner(System.in);
    r=ref.nextInt();
    
    area = PI*r*r;
    System.out.println("The area of the circle is " + area);
  }
}

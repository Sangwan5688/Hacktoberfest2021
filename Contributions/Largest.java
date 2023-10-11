import java.util.Scanner;
class Largest{
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);
        System.out.print("Enter first number : ");
        int number1 = input.nextInt();
        System.out.print("Enter second number : ");
        int number2 = input.nextInt();

        if(number1 > number2){
            System.out.println("First number is bigger");
        } else if(number2 > number1){
            System.out.println("Second number is bigger");
        } else {
            System.out.println("Numbers are equal");
        }
    }
}
import java.util.Scanner;

/**
 * This class calculates the electricity bill for a given number of units.
 */
public class ElectricityBill {

    public static void main(String[] args) {
        long units;
        Scanner sc = new Scanner(System.in);

        // Prompt user to enter the number of units
        System.out.println("Enter the number of units");

        // Read the input from user
        units = sc.nextLong();

        double billpay = 0;

        // Calculate bill based on units consumed
        if (units < 100) {
            billpay = units * 1.20;
        } else if (units <= 300) {
            billpay = 100 * 1.20 + (units - 100) * 2;
        } else if (units > 300) {
            billpay = 100 * 1.20 + 200 * 2 + (units - 300) * 3;
        }

        // Print the calculated bill to the console
        System.out.println("Bill to pay : " + billpay);
    }
}


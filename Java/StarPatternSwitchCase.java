import java.util.Scanner;

public class StarPatternSwitchCase {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Choose a star pattern to print:");
        System.out.println("1. Pyramid");
        System.out.println("2. Inverted Pyramid");
        System.out.println("3. Hollow Pyramid");
        System.out.println("4. Hollow Inverted Pyramid");
        System.out.println("5. Exit");
        
        int choice = scanner.nextInt();
        
        switch (choice) {
            case 1:
                printPyramid(5);
                break;
            case 2:
                printInvertedPyramid(5);
                break;
            case 3:
                printHollowPyramid(5);
                break;
            case 4:
                printHollowInvertedPyramid(5);
                break;
            case 5:
                System.out.println("Exiting the program.");
                break;
            default:
                System.out.println("Invalid choice. Please select a valid option.");
        }
    }

    // Method to print a pyramid pattern
    public static void printPyramid(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * i + 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    // Method to print an inverted pyramid pattern
    public static void printInvertedPyramid(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * (n - i) - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    // Method to print a hollow pyramid pattern
    public static void printHollowPyramid(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * i + 1; j++) {
                if (j == 0 || j == 2 * i) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }

    // Method to print a hollow inverted pyramid pattern
    public static void printHollowInvertedPyramid(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * (n - i) - 1; j++) {
                if (j == 0 || j == 2 * (n - i) - 2) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}

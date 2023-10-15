import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        System.out.println("Welcome to the Number Guessing Game!");

        //We'll ask the user to input Upper bounds and Lower bounds.

        System.out.print("Enter the Lower Bound: ");
        int lowerBound = scanner.nextInt();
        System.out.print("Enter the Upper Bound: ");
        int upperBound = scanner.nextInt();
        int numberToGuess = random.nextInt(upperBound - lowerBound + 1) + lowerBound;
        int attempts = 0;
        int guess = 0;
        
        System.out.println("I'm thinking of a number between " + lowerBound + " and " + upperBound + ".");
        
        while (guess != numberToGuess) {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();
            attempts++;
            
            if (guess < lowerBound || guess > upperBound) {
                System.out.println("Please guess a number between " + lowerBound + " and " + upperBound + ".");
            } else if (guess < numberToGuess) {
                System.out.println("Higher! Try again.");
            } else if (guess > numberToGuess) {
                System.out.println("Lower! Try again.");
            }
        }
        
        System.out.println("Congratulations! You guessed the number " + numberToGuess + " in " + attempts + " attempts.");
        
        scanner.close();
    }
}

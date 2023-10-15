import java.util.Scanner;

public class TextAdventureGame {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Welcome to the Text Adventure Game!");
        System.out.println("You find yourself in a mysterious forest. Choose your path:");

        System.out.println("1. Follow the path deeper into the forest.");
        System.out.println("2. Climb a tree to get a better view.");
        System.out.println("3. Camp here for the night.");

        int choice = input.nextInt();

        if (choice == 1) {
            System.out.println("You follow the path and discover a hidden treasure chest!");
            System.out.println("You win!");
        } else if (choice == 2) {
            System.out.println("You climb the tree and spot a hidden cave.");
            System.out.println("Do you want to explore the cave? (yes/no)");
            String exploreCave = input.next();
            if (exploreCave.equalsIgnoreCase("yes")) {
                System.out.println("You enter the cave and find a sleeping dragon. You barely escape!");
            } else {
                System.out.println("You climb down safely from the tree.");
            }
        } else if (choice == 3) {
            System.out.println("You camp for the night. It's a peaceful night, and you wake up refreshed.");
        } else {
            System.out.println("Invalid choice. The forest is vast, and you must choose wisely.");
        }

        System.out.println("Thanks for playing!");
    }
}

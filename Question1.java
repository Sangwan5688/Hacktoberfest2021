import java.util.Scanner;
public class Question1 {
    /*
    Question : Write a java program to calculate the percentage of a given student in CBSE board exam, His makrs from 5 subjects must be taken as input
    from the keyboard (marks out of 100)
    */
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter your Mark in Subject 1");
        float Subject1 = sc.nextFloat();
        System.out.println("Enter your Marks in Subject 2");
        float Subject2 = sc.nextFloat();
        System.out.println("Enter your Marks in Subject 3");
        float Subject3 = sc.nextFloat();
        System.out.println("Enter your Marks in Subject 4");
        float Subject4 = sc.nextFloat();
        System.out.println("Enter your marks in Subject 5");
        float Subject5 = sc.nextFloat();
        float percentage = ((Subject1 + Subject2 + Subject3 + Subject4 + Subject5 )/500.0f)*100;
        System.out.print("Your Percentage is ");
        System.out.print(percentage);
    }
}

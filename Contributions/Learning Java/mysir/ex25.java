import java.util.Scanner;

public class ex25 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String fname = "my name is khan";
        String name = "vishal kumar";
        String full_name = sc.nextLine();
        System.out.println(full_name);
        System.out.println(full_name.equals(name));
        System.out.println(full_name == name); // 🔥 b/c fname is made by using new 
    }
}

package problemSolvingHR;

import java.util.InputMismatchException;
import java.util.Scanner;

public class JavaTryBlock {

	public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        try{
        int x=sc.nextInt();
        int y=sc.nextInt();
        int r=x/y;
        System.out.println(r);
        } catch (InputMismatchException e){
            System.out.println(e.getClass().getName());
        } catch (ArithmeticException e) {
        	System.out.println(e.getClass().getName() + ": " + e.getMessage());
        }

	}

}

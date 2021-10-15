import java.util.Scanner;
public class Circle{

	public static void calculate(float r){
		float dia,cir,area;
		float pi = 3.14f;
		dia= (2*r);
		cir= (2* pi * r);
		area =(pi * r * r);
	
		System.out.println("Diameter of the circle:" +dia);
		System.out.println("Diameter of the circle:" +cir);
		System.out.println("Diameter of the circle:" +area);

	}

	public static void main(String[]args){
		float radius,x;
		Scanner s = new Scanner(System.in);
		System.out.print("Enter the radius of the circle:");
		radius= s.nextFloat();
		calculate(radius);	
	}
}
		

	
		

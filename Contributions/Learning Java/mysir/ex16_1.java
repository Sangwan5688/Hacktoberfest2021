class A {    
    static int y = 5;
}

class B extends A{
    static{
        y  = 6;
    }
}

public class ex16_1 {
    public static void main(String[] args) {
        System.out.println(B.y); 
        // B class was $%$ called , that why static intialization block do $%$ work
    }
}

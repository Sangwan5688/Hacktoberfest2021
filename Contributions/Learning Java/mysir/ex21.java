// ! By default public and abstract method in interface 
// ! If we declare function but $%$ implement then it is default : access specifier
interface iterface001{
    public String name = "vishal"; // ? public, static, final
    public void Role();
}

class Person implements iterface001{
    public void Role(){ 
        System.out.println("Person"); 
    }
}

public class ex21 {
    public static void main(String[] args) {
        Person p = new Person();
        p.Role();
        System.out.println(p.name);
    }
}
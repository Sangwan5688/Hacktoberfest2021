// ! class must be abstract , then only we can apply abstract method

abstract class Person{
    abstract public void Role();
}

class Student extends Person{
    public void Role(){ System.out.println("Student"); }
}

class Faculty extends Person{
    public void Role(){ System.out.println("Faculty"); }
}

public class ex20 {
    public static void main(String[] args) {
        Student s = new Student();
        s.Role();
    }
}

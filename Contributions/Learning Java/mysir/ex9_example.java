class Person {
    private int age;
    private String name;

    public void setName(String n){ name = n; }
    public void setAge(int a){ age = a; }
    public String getName(){ return name; }
    public int getAge(){ return age; }
}

class Student extends Person{
    private int rollNo;

    public void setRollNo(int r){ rollNo = r; }
    public int getRollNo(){ return rollNo; }
}

public class ex9_example {
    public static void main(String[] args) {
        Student stu1 = new Student();

        stu1.setAge(20);
        stu1.setName("vishal");
        stu1.setRollNo(39);
        
        System.out.println(stu1.getName() + stu1.getAge() + stu1.getRollNo());
    }
}
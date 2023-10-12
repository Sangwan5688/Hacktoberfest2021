abstract class Person {
    public String name;
    public Integer age;
    public Person(){ age = 0; name = ""; }
    public void setName(String name){ this.name = name; }
    public void setAge(int age){ this.age = age; } 
}

class Student extends Person{ public String Roll = "Student"; }
class Faculty extends Person{ public String Roll = "Faculty"; }

class ex19 {
    public static void main(String[] args) {
        // ! Person p = new Person() can $%$ intintiated
        Student s = new Student();
        Person s1 = new Student(); // only parent method work
        s.setName("vishal");
        System.out.println(s.Roll + " " + s.name);
    }    
}
interface i1{ void setName(String name); }
interface i2{ void setAge(int age); }
interface i3 extends i1,i2 { void show(); }

class Person implements i3{
    public String name;
    public int age;
    public void setName(String name){ this.name = name; }
    public void setAge(int age){ this.age = age; }
    public void show(){ System.out.println(this.name + " " + this.age);}
}

class Student extends Person implements i1, i2 { 
    public String name;
    public int age;
    public void setName(String name){ this.name = name; }
    public void setAge(int age){ this.age = age; }
    public void show(){ System.out.println(this.name + " " + this.age);}
}

public class ex21_2 {
    public static void main(String[] args) {
        i3 p = new Person();
        p.setName("vishal");
        p.setAge(12);
        p.show();
        /*
         * i1 p = new Person()
         * p.show() Error
         * p.setName()
         */
    }
}

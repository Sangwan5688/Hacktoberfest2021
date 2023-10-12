/* 
    ! same name but different signature -> function overloading 
    * both are in same or base class
    * one in super and another in base class
*/
class A{
    public void f1(int x){
        System.out.println(x);
    }    
}
class B extends A{
    public void f1(int x,int y){
        System.out.println(x+ " " + y);
    }
}
/* 
    ! same function in base and derived class -> function overloading 
*/
class AA {
    public void foverloading(){
        System.out.println("Base class function");
    }
}
class BB extends AA{
    public void foverloading(){
        System.out.println("Derived class function");
    }
}

public class ex12 {
    public static void main(String[] args) {
        B obj1 = new B();
        obj1.f1(05);
        obj1.f1(5, 3);

        BB obj2 = new BB();
        obj2.foverloading();
    }
}

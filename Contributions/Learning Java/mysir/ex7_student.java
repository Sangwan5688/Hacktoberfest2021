// package pack2;
public class ex7_student {
    private int rollNo;
    private String name= "";

    public void setRollNo(int r){ rollNo = r; }
    public void setName(String n){ name = n; }
    public int getRollNo(){ return rollNo; }
    public String getName(){ return name; }
    public void showData(){ System.out.println("Name : "+ name + "\n Roll No : " + rollNo);}

    public static void main(String[] args) {
        System.out.println("Student class");
    }
}
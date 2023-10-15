class Box {
    private int l,b,h;
    public Box(int l,int b,int h){
        this.l = l;
        this.b = b;
        this.h = h;
    }
    public void show(){
        System.out.println("length : " + l);
        System.out.println("breadth : " + b);
        System.out.println("height : " + h);
    }    
}
public class pr8 {
    public static void main(String[] args) {
        Box b1 = new Box(5, 4, 6);
        b1.show();
    }
}

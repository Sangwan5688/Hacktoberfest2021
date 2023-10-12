class Box {
    private int l,b,h;
    public Box(){ l = 10; b = 8; h = 9; }
    public Box(int len,int bre,int hei){ l = len; b = bre; h = hei; }
    public void show(){ 
        System.out.println("length : "+ l +", breadth : " + b+", height : "+h);
    }
}

public class ex10 {
    public static void main(String[] args) {
        Box b = new Box();
        b.show();
        Box b1 = new Box(99,446,78);
        b1.show();
    }
}
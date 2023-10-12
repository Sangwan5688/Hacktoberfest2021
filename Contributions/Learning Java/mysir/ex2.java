class Box {
    private int length, breadth, height;

    public void setDimenssion(int l,int b,int h){
        length = l;
        breadth = b;
        height = h;
    }

    public void showDimenssion(){
        System.out.println("lenght : "+length+breadth);
        System.out.println("breadth : "+breadth);
        System.out.println("Height : "+height);
    }
}
public class ex2 {
    public static void main(String[] args) {
        System.out.println("Box program");

        System.out.println("Refrence to Fist box");
        Box b = new Box();
        b.setDimenssion(5, 6, 8);
        b.showDimenssion();

        System.out.println("Refrence to the second box");
        b = new Box();
        b.showDimenssion();
    }
}
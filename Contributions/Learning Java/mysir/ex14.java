/*
 ! this
 * c++          ->      pointer
 * java         ->      refrence variable
*/

class GiftTaken{
    public void acceptGift(Box b){
        System.out.println("length : " + b.l + ", breadth : " + b.b + ", height : " + b.h);
    }
}

class Box {
    public int l,b,h;
    public Box(int l,int b,int h){
        this.l = l;this.b = b;this.h = b;
    }
    public void show(){
        System.out.println("length : " + this.l + ", breadth : " + this.b + ", height : " + this.h);
    }    
    public void sendBox(){
        GiftTaken gf = new GiftTaken();
        gf.acceptGift(this);
    }
}


public class ex14 {
    public static void main(String[] args) { // static member function
        Box b = new Box(5, 3, 6);
        b.show();
        b.sendBox();
    }
}
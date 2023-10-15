final class dummy{
        
}

class Example {
    // instance
    public final int x;  // x = 5
    {
        // x = 8;
    }
    public Example(){
        x = 9;
    }

    // static
    public final static int roi = 2;
    public static final int kPop;
    static{ 
        kPop = 4565;
    }

    public final void fun(){ // no override
        final int k = 44; 
        System.out.println(k);
    }

    final class dummy_inner_class{

    }
}

public class ex13 {
    public static void main(String[] args) {
        Example e = new Example();
        System.out.println(e.x);

    }
}
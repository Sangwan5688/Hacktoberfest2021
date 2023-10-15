import java.util.TreeSet;
import java.util.Comparator;
import java.util.Iterator;

class Book{
    private String title;
    private Double price;
    public Book(String title,Double price){
        this.title = title;
        this.price = price;
    }
    public String getTitle(){ return this.title; }
    public Double getPrice(){ return this.price; }
}
class MyComparator implements Comparator{
    public int compare(Object obj1,Object obj2){
        Book o1 = (Book)obj1,o2 = (Book)obj2;
        if(o1.getPrice() < o2.getPrice()) return -1;
        else return 1;
    }
}

public class ex49 {
    public static void main(String[] args) {
        TreeSet<String> st = new TreeSet<>();
        st.add("A");st.add("D");st.add("C");st.add("B");st.add("Z");
        System.out.println(st);
        
        TreeSet<Float> st1 = new TreeSet<>();
        st1.add(1.545f);st1.add(1.5f);st1.add(2.45f);st1.add(3.005f);
        System.out.println(st1);

        // ! Bydefault compare to function used by treeSet but ~ inherited by bufferString
        TreeSet<StringBuffer> st2 = new TreeSet<>();
        st2.add(new StringBuffer("a"));st2.add(new StringBuffer("e"));st2.add(new StringBuffer("b"));st2.add(new StringBuffer("c"));

        Book b1 = new Book("learn html in 10 minutes", 10.24);
        Book b3 = new Book("crack CDS 2k22", 101.24);
        Book b2 = new Book("crack gate 2k22", 50.24);
        TreeSet<Book> st3 = new TreeSet<Book>(new MyComparator());
        st3.add(b1);
        st3.add(b2);
        st3.add(b3);

        Iterator itr = st3.iterator();
        Book b;
        while(itr.hasNext()){
            b = (Book) itr.next();
            System.out.println(b.getTitle() + " : " + b.getPrice());
        }

    }
}

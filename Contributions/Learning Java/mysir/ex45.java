import java.util.Enumeration;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.Vector;

public class ex45 {
    public static void main(String[] args) {
        Vector<Integer> v = new Vector<>();
        v.add(465);
        v.add(425);
        v.add(465);
        System.out.println(v);
        Enumeration e = v.elements();
        System.out.println("We are going to Iterate using Enumeration");
        while(e.hasMoreElements()){
            System.out.println(e.nextElement());
        }

        Iterator<Integer> it = v.iterator();
        System.out.println("We are going to iterate using Iterator");
        while(it.hasNext()){
            System.out.println(it.next());
            it.remove();
        }
        //! Single direction
        //! ~ replace, ~ remove
        
        LinkedList<Integer> list = new LinkedList<>();
        list.add(123123);
        list.add(123234);
        list.add(12);   
        list.add(31231);
        System.out.println(list);
        ListIterator<Integer> itr = list.listIterator();
        while(itr.hasNext()){
            System.out.println(itr.next());
        }

    }   
}

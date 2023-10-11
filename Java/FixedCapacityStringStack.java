import java.util.Iterator;
import java.util.NoSuchElementException;

public class FixedCapacityStringStack implements Iterable<String>{
    private String[] a; //holds items inside of stack
    private int N; //amount of items inside stack

    public FixedCapacityStringStack(int capacity){
        a = new String[capacity];
        N = 0;
    }

    public boolean isEmpty(){
        return N == 0;
    }


    public boolean isFull(){
        return N == a.length;
    }
    
    public void push(String item){
        a[N] = item;
        N++;
    }
    
    public String pop(){
        return a[N--];
    }
    public String peek(){
        return a[N-1];
    }

    public Iterator<String> iterator(){
        return new ReverseArrayIterator();
    }

    public class ReverseArrayIterator implements Iterator<String>{
        private int i = N - 1;

        public boolean hasNext(){
            return i >= 0;
        }

        public String next() { 
            if (!hasNext()) throw new NoSuchElementException();
            return a[i--];
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }
    }    
}
package Java.collection;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.Set;
import java.util.Stack;
import java.util.TreeMap;
import java.util.TreeSet;


/**
 * Student
 */
class Student {
    String name;
    Integer rollNo;

    public Student(String name, Integer rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    @Override
    public String toString() {
        return "Student{" + "name : " + name + ", rollNo : " + rollNo + "}";
    }

    @Override
    public boolean equals(Object o) {
        if(this == o) return true;
        if(o == null || getClass() != o.getClass()) return false;
        Student stu = (Student)o;
        return rollNo == stu.rollNo;
    }

    @Override
    public int hashCode() {
        return Objects.hash(rollNo);
    }

    //! class Student implements Comparable<Student>
    /* 
     * public int compareTo(Student that) {
     *      return this.name.compareTo(that.name);
     * }
     */
}

/**
 * CustomCompare
 */
class CustomCompare implements Comparator<Student> {
    public int compare(Student a, Student b) {
        return a.rollNo - b.rollNo;
    }
}


public class Sample {
    public static void main(String[] args) {
        //! ArrayList
        ArrayList<String> studentName = new ArrayList<>();
        studentName.add("vishal");
        /*
         * n == 1 , max = 10
         * nth , max = n + n/2 + 1
         */

        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        System.out.println(list);

        list.add(4);
        System.out.println(list);

        list.add(2,-1);
        System.out.println(list);
        
        //! List
        List<Integer> l1 = new ArrayList<>();
        l1.add(10001);
        l1.add(1564);
        list.addAll(l1);
        System.out.println(list);

        System.out.println(list.get(1));
        
        list.remove(1);
        System.out.println(list);       

        list.remove(Integer.valueOf(10001));
        System.out.println(list);

        list.clear();
        System.out.println(list);

        list.add(1);
        list.add(2);
        list.add(3);

        list.set(1, 5);
        System.out.println(list);

        System.out.println(list.contains(3));

        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + " : ");
        }
        System.out.println();   

        for (Integer i : list) {
            System.out.print(i + ", ");
        }
        System.out.println();

        Iterator<Integer> it = list.iterator();

        while(it.hasNext()) {
            System.out.println("Iterator : " + it.next());
        }
        System.out.println();

        //! Stack
        Stack<Integer> st = new Stack<>();
        st.push(23);
        st.push(54);
        st.push(234);

        System.out.println("Stack : " + st);

        System.out.println(st.peek());;

        st.pop();

        System.out.println("Stack : " + st);

        //! Linked list 
        Queue<Integer> q = new LinkedList<>();
        q.offer(123);
        q.offer(4353);
        q.offer(89);

        System.out.println("Queue : " + q);
        
        System.out.println("Poll in Queue : " + q.poll());
        
        System.out.println("Queue : " + q);

        System.out.println("Top : " + q.peek());
        /* 
         ! Alternative which throw exception
         * offer == add
         * peek == element
         * poll == remove
         */

        //! Priority Queue
        // PriorityQueue<Integer> pq = new PriorityQueue<>();
        Queue<Integer> pq = new PriorityQueue<>();
        pq.offer(34234);
        pq.offer(1);
        pq.offer(123);
        pq.offer(435);

        System.out.println("Priority Queue : " + pq);
        
        System.out.println(pq.poll()); 
        
        System.out.println("Priority Queue : " + pq);
        
        System.out.println(pq.peek());
        
        System.out.println("Priority Queue : " + pq);

        PriorityQueue<Integer> pq1 = new PriorityQueue<>(Collections.reverseOrder());
        
        pq1.offer(123);
        pq1.offer(65464);
        pq1.offer(21312);

        System.out.println("Max Queue : " + pq1.poll());

        System.out.println("Max Queue : " + pq1);

        //! ArrayDeque
        ArrayDeque<Integer> ad = new ArrayDeque<>();
        ad.offer(123123);
        ad.offer(1221);
        ad.offer(354234);

        ad.offerFirst(1);

        System.out.println("Array Deque : " + ad);
        
        ad.removeFirst();
        
        System.out.println("Array Deque : " + ad);
        
        System.out.println("Array Deque peek : " + ad.peek());
        System.out.println("Array Deque peek first : " + ad.peekFirst());
        System.out.println("Array Deque peek last : " + ad.peekLast());
        
        System.out.println("Array Deque : " + ad);
        
        System.out.println("Array Deque poll : " + ad.poll());
        System.out.println("Array Deque poll first : " + ad.pollFirst());
        System.out.println("Array Deque poll last : " + ad.pollLast());
        
        System.out.println("Array Deque : " + ad);
        
        //! Set - order is ~ define || insert O(1)
        Set<Integer> s = new HashSet<>();
        s.add(123);
        s.add(1243);
        s.add(113);
        s.add(1221);
        s.add(1231);
        s.add(1231);

        System.out.println("Set : " + s);
        
        s.remove(1231);
        
        System.out.println("Set : " + s);

        System.out.println("set contain : " + s.contains(123));

        System.out.println("set is empty : " + s.isEmpty());

        System.out.println("set size : " + s.size());

        s.clear();

        //! LinkedHashSet = order is maintain
        Set<Integer> s1 = new LinkedHashSet<>();
        //* Same as HashSet
        
        //! TreeSet = binary search + set || insert O(log(N))
        Set<Integer> tr = new TreeSet<>();
        //* Same as HashSet

        //! set + abstract datatype
        Set<Student> stu = new HashSet<>();
        stu.add(new Student("vishal", 1));
        stu.add(new Student("vivek", 2));
        stu.add(new Student("yash", 3));
        stu.add(new Student("suraj", 4));
        
        stu.add(new Student("papu", 1));

        System.out.println("Abstract DataType : " + stu);

        //! Map
        Map<Integer,Integer> mp = new HashMap<>();
        //* insert, search - O(1)
        mp.put(415, 1);
        mp.put(456, 2);
        mp.put(23, 1);
        
        mp.put(23, 3); // * update bydefault

        if(mp.containsKey(415)) {
            System.out.println("Already Present");
        }

        if(!mp.containsKey(123123)) {
            mp.put(123123, 2);
        }

        mp.putIfAbsent(132, 12);

        System.out.println("Map : " + mp);

        for(Map.Entry<Integer,Integer> pr : mp.entrySet()) {
            System.out.println(pr); 
            System.out.println("Key : " + pr.getKey());
            System.out.println("Value : " + pr.getValue());
        }

        for(Integer key : mp.keySet()) {
            System.out.print("key : " + key + ", ");
        }
        
        for(Integer value : mp.values()) {
            System.out.println("value : " + value + ", ");
        }

        System.out.println(mp.containsValue(12));
        System.out.println("map is empty : " + mp.isEmpty());

        //! TreeMap
        Map<Integer,Integer> tmp = new TreeMap<>();

        // * same as hashmap , key are in sorted order like map in c++
        tmp.put(123, 1);
        System.out.println("TreeMap : " + tmp);

        tmp.remove(123);
        System.out.println("TreeMap : " + tmp);
    
        //! ArrayClass
        int[] arr = {2,3,4,6,8,10,45,48,-1};
        int index = Arrays.binarySearch(arr, 4);

        System.out.println("index : " + index + ", arr[index] : " + arr[index]);

        Arrays.sort(arr);
        System.out.println("Sorted Array : ");   

        for(int i : arr) {
            System.out.print(i + ", ");
        }System.out.println();

        Arrays.fill(arr, -1);

        for(int i : arr) {
            System.out.print(i + ", ");
        }System.out.println();

        //! collection
        List<Integer> r1 = new ArrayList<>();
        r1.add(123);
        r1.add(-19);
        r1.add(123123);
        r1.add(123123);
        r1.add(123123);

        System.out.println("min in list : " + Collections.min(r1));
        System.out.println("max in list : " + Collections.max(r1));
        System.out.println("frequency in list : " + 
            Collections.frequency(r1, 123));
        System.out.println("frequency in list : " + 
            Collections.frequency(r1, 123123));

        Collections.sort(r1);
        System.out.println("sorted : " + r1);

        Collections.sort(r1,Comparator.reverseOrder());
        System.out.println("reverse sorted : " + r1);


        //! sort Abstract Datatype
        List<Student> w1 = new ArrayList<>();
        w1.add(new Student("vishal", 123));
        w1.add(new Student("vivek", 1234));
        w1.add(new Student("ankit", 112311));

        System.out.println(w1);
        Collections.sort(w1,new CustomCompare());

        System.out.println(w1);
        
        Collections.sort(w1,new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o1.name.compareTo(o2.name); 
            }
        });
        
        System.out.println(w1);

        Collections.sort(w1,(o1, o2) -> o1.name.compareTo(o2.name));

        System.out.println(w1);
    }
}
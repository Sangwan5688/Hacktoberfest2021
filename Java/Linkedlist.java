class Node {
    int data;
    Node node;
    // public linkedList.Node next;
    public Node next;

    Node(int val) {
        this.data = val;
    }
}

public class linkedList {

    public static void main(String[] args) {

        Node n1 = new Node(30);
        Node n2 = new Node(20);
        Node n3 = new Node(12);
        Node head = n1;
        head.next = n2;
        n2.next = n3;
        n3.next = null;
        // System.out.println(head.next.data);
        traverse(head);
        // insert(10, head, 1);
        // del(head, 1);

    }

    // Running a linked list and printing its elements !

    public static void traverse(Node head) {
        Node cur = head;
        while (cur != null) {
            System.out.println(cur.data);
            cur = cur.next;

        }
    }

    // Inserting a data in between a linked list!!

    public static void insert(int data, Node head, int pos) {
        Node point = head;
        Node addData = new Node(data);
        int i;
        if (pos == 0) {
            addData.next = head;
            head = addData;
            return;
        }
        for (i = 0; i < pos - 1; i++) {
            point = point.next;
        }
        addData.next = point.next;
        point.next = addData;
        traverse(head);
    }

    // Deleting an element from the linked list!

    public static void del(Node head, int pos) {
        Node point = head;
        for (int i = 0; i < pos - 1; i++) {
            point = point.next;
        }
        point.next = point.next.next;
        traverse(head);
    }

}

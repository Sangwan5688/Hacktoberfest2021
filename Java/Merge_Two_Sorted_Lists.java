/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Merge_Two_Sorted_Lists {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        
        
        //Using No extra space
        
        ListNode head;
        
        if(l1==null){
            return l2;
        }
        
        if(l2 == null){
            return l1;
        }
        
        if(l1.val <=l2.val){
            
            head = l1;
           
        }
        
        else{
            
            head = l2;
          
        }
        
        ListNode temp1 = l1;
        ListNode temp2 = l2;
        
        ListNode tail = new ListNode();
        
        while(temp1!=null && temp2!=null){
            
            System.out.println(temp1.val +" "+temp2.val);
            
            if(temp1.val <=temp2.val){
                
              tail.next = temp1;
              tail = temp1;
              temp1 = temp1.next;
                
            }
            
            else{
                
                tail.next = temp2;
                tail = temp2;
                
                temp2 = temp2.next;
                
            }
            
        }
        
        if(temp1 == null && temp2!=null){
            
            tail.next = temp2;
            tail = temp2;
        }
        
        else if(temp1 != null && temp2 ==null){
            
            tail.next = temp1;
            tail = temp1;
        }
        
        return head;
        

        
        
        
        
        
        
        
        
        
        
        
        
    }
}

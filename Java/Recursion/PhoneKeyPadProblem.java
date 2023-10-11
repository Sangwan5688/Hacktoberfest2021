import java.util.ArrayList;

public class PhoneKeyPadProblem {

    static void phoneKeypad(String str,String elem[],int index,String out,ArrayList<String> ans){
        if(str.length()<=index)
        {
            ans.add(out);
            return;
        }
        int num = str.charAt(index)-'0';
        // System.out.println(num);
        String temp = elem[num];
        for(int i=0;i<temp.length();i++){
            out+=temp.charAt(i);
            phoneKeypad(str, elem, index+1, out, ans);
            //to remove the last added charater
            
            out=out.substring(0,out.length()-1);
            
        }
    }
  public static void main(String[] args) {
    String elem[] = new String[]{"","","abc","def","ghi","jkl","mno","pqr","stuv","wxyz"};
    ArrayList<String> ans = new ArrayList<>();
    String str= "23";
    String out="";
    int index=0;
    phoneKeypad(str,elem,index,out,ans);
    System.out.println(ans);
  }  
}

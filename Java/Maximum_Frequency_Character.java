import java.util.*;
public class Maximum_Frequency_Character
{

    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        String st = sc.next();
        HashMap<Character,Integer> mp = new HashMap<>();
        for(int i = 0;i<st.length();i++)
        {
            char ch = st.charAt(i);
            mp.put(ch,mp.getOrDefault(ch,0)+1);
        }
        int maxf = Integer.MIN_VALUE;
        char maxfc=st.charAt(0);
        
        for(char ch:mp.keySet())
        {
            int freq = mp.get(ch);
            if(freq>maxf)
            {
                maxf = freq;
                maxfc = ch;
            }
        }
        System.out.println(maxfc);
    }

}
package problemSolvingHR;

public class DownToZero {

	public static void main(String[] args) {
		
		int n=5;
		
		int count=0;
		if(IsPrime(n)) System.out.println(n);
		
		while(n!=0) {
			
			if(isEven(n)==0) {	//when even
				
				 n=Math.max(n/2, 2);
	                count++;
	                if(n==2){
	                    count+=2;
	                    break;
	                }
			}
			else if(isEven(n)==1) {  //when odd
				boolean flag=false;
				
				for(int i=3;i<n;i=i+2) {
					
					if(n%i==0) {
						
						n=Math.max(n/i, i);
						count++;
						
						if(IsPrime(n)) count+=n;
						flag=true;
					}
					if(flag) break;
				}
			}
		}
		System.out.println(count);
		
	}
	static int isEven(int n) {
		return n&1;
	}
	public static boolean IsPrime(int number)
	    {
	        if (number < 2) return false;
	        if (number % 2 == 0) return (number == 2);
	        int root = (int)Math.sqrt((double)number);
	        for (int i = 3; i <= root; i += 2)
	        {
	            if (number % i == 0) return false;
	        }
	        return true;
	    }

}


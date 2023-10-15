package mis5;

public class PGM_medical 
{
	int size = 0;
	public void convert_To_Len_th_base(int n, int arr[],int len, int L, int a1[][])
	{
		for (int i = L-1; i >= 0; i--)
		{
			a1[size][i] =arr[n % len];
			n /= len;
		}
		size = size+1;
	}
	public int[][] fullfact(int arr[], int len, int L,int a1[][])
	{
		for (int i = 0; i < (int)Math.pow(len, L); i++)
		{
			convert_To_Len_th_base(i, arr, len, L,a1);
		}
		return a1;
	}

	public double[] JPD(int[][] M,double[] asia,double[] smoker,double[][] tuber,double[][] lunC,
			double[][] bronchi,double[][] xRay,double[][] dysponea,double[][] tuberCanc)
	{	
		double p[] =new double[M.length];
		int id[][]={{0,1},{2,3}};
		for(int k=0;k<p.length;k++)
		{
			int a = M[k][0];
			int s=M[k][1];
	        int t=M[k][2];
	        int b=M[k][4];
	        int c=M[k][3];
	        int d=M[k][6];
	        int x=M[k][5];
	        int tc=M[k][7];
	        double tempprob=asia[a]*smoker[s];
	        tempprob=tempprob*tuber[t][a];
	        tempprob=tempprob*bronchi[b][s];
	        tempprob=tempprob*lunC[c][s];
	        int  idind=id[c][t];
	        tempprob=tempprob*tuberCanc[tc][idind];
	        idind=id[b][tc];
	        tempprob=tempprob*dysponea[d][idind];
	        tempprob=tempprob*xRay[x][tc];
	        p[k]=tempprob;
		}
		return p;
		
	}
	public double sum(double[] arr)
	{
		double sum = 0;
	    for (int i =0;i<arr.length;i++)
	    {
	    	sum =sum+arr[i];
	    }
	    return sum;
	}
	public int[] checkarray(int[][] M,int n, int n1)
	{
		int ind[] =new int[M.length];
		for(int i =0;i<M.length;i++)
		{
			if(M[i][n]== n1)
			{
				ind[i] =1;
			}
		}
		return ind;
	}
	public double sum1(double[] arr,int[] ind){
		double sum=0 ;
		for(int i=0;i<arr.length;i++)
		{
			if(ind[i] == 1)
			{
				sum = sum+ arr[i];
			}
		}
		return sum;
		
	}
	public int[] and(int[] arr,int arr1 [])
	{
		int ind[] =new int[arr.length];
		for(int i =0;i<arr.length;i++)
		{
			ind[i] =arr[i]&arr1[i];
		}
		return ind;
	}
	public static void main(String[] args) 
    { 
		 	
		 double asia[] ={0.01, 0.99};
		 double smoker[]={0.5 , 0.5};
		 double tuber[][]={{0.05,0.01},{ 0.95,0.99}};
		 double lunC[][]={{0.1, 0.01},{0.9,0.99}};
		 double bronchi[][]={{0.6 ,0.3},{ 0.4,0.7}};
		 double tuberCanc[][] ={{1,1,1,0},{0,0,0, 1}};
		 double xRay[][] = {{0.98, 0.05},{0.02, 0.95}};
		 double dysponea[][] = {{0.9 ,0.8 ,0.7, 0.1},{0.1 ,0.2, 0.3, 0.9}};
		 
		    PGM_medical pg = new PGM_medical();
		    int arr[] = {0, 1};
		    int len = arr.length;
		    int L = 8;
		    int a1[][] =new int[(int)Math.pow(len, L)][L];
		    int[][] M = pg.fullfact(arr, len, L,a1);
		    double p[] = pg.JPD(M,asia,smoker,tuber,lunC,bronchi,xRay,dysponea,tuberCanc);
		    
		    System.out.println("P(Bronchi/Dysponia");
		    int kk []=pg.checkarray(M,6,0);
		    double den =pg.sum1(p,kk);
		    int kk1 []=pg.and(pg.checkarray(M,4,0),pg.checkarray(M,6,0));
		    double num =pg.sum1(p,kk1);
		    double inf1 = num/den;
		    System.out.println(inf1);
		    
		    System.out.println("P(Bronchi/(Dysponia,Non-Smoker)");
		    int[] xx =pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0));
		    double den1 =pg.sum1(p,xx);
		    int[] xx1 =pg.and(pg.checkarray(M,4,0),pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0)));
		    double num1 =pg.sum1(p,xx1);
		    double inf2 = num1/den1;
		    System.out.println(inf2);
		    
		    System.out.println("P(Bronchi/(Dysponia,Non-Smoker,+ve X-Ray)");
		    int[] yy =pg.and(pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0)),pg.checkarray(M,5,0));
		    double den2 =pg.sum1(p,yy);
		    int[] yy1 = pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0));
		    int[] yy2 =pg.and(pg.checkarray(M,4,0),pg.and(yy1,pg.checkarray(M,5,0)));
		    double num2 =pg.sum1(p,yy2);
		    double inf3 = num2/den2;
		    System.out.println(inf3);
		    
		    System.out.println("P(Bronchi/(Dysponia,Non-Smoker,+ve X-Ray,Visit Asia)");
		    int[] z =pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0));
		    int[] zz =pg.and(pg.and(z,pg.checkarray(M,5,0)),pg.checkarray(M,0,0));
		    double den3 =pg.sum1(p,zz);
		    int[] zz1 = pg.and(pg.and(pg.checkarray(M,1,1),pg.checkarray(M,6,0)),pg.checkarray(M,5,0));
		    int[] zz2 =pg.and(pg.checkarray(M,4,0),pg.and(zz1,pg.checkarray(M,0,0)));
		    double num3 =pg.sum1(p,zz2);
		    double inf4 = num3/den3;
		    System.out.println(inf4);
		    
}
}

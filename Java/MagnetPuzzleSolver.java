// java code implementation 
import java.util.*;
import java.lang.*;
import java.io.*;
import java.util.stream.*;

public class Main {

public static boolean canPutPatternHorizontally(char[][] rules,int i,int j, char[] pat){
	if( j-1>=0 && rules[i][j-1] == pat[0]){
	return false;
	} 
	else if(i-1>=0 && rules[i-1][j] == pat[0]){
	return false;
	} 
	else if(i-1>=0 && rules[i-1][j+1] == pat[1]){
	return false;
	} 
	else if(j+2 < rules[0].length && rules[i][j+2] == pat[1]){
	return false;
	}
	return true; 
}
public static boolean checkConstraints(char[][] rules){
	int M = 5;
	int N = 6;
	int[] top = { 1, -1, -1, 2, 1, -1 };
	int[] bottom = {2, -1, -1, 2, -1, 3 };
	int[] left = {2, 3, -1, -1, -1};
	int[] right = {-1, -1, -1, 1, -1};

	int[] pCountH = new int[rules.length];
	for(int i= 0; i < rules.length; i++){
	pCountH[i] = 0;
	}

	int[] nCountH = new int[rules.length];
	for(int i = 0; i < rules.length; i++){
	nCountH[i] = 0;
	}

	for(int row = 0; row < rules.length; row++){
	for(int col = 0; col < rules[0].length; col++){
		char ch = rules[row][col];
		if(ch == '+'){
		pCountH[row] += 1;
		}
		else if(ch == '-'){
		nCountH[row] += 1;
		}
	}
	}



	int[] pCountV = new int[rules[0].length];
	for(int i= 0; i < rules[0].length; i++){
	pCountV[i] = 0;
	}

	int[] nCountV = new int[rules[0].length];
	for(int i = 0; i < rules[0].length; i++){
	nCountV[i] = 0;
	}


	for(int col = 0; col < rules[0].length; col++){
	for(int row = 0; row < rules.length; row++){
		char ch = rules[row][col];
		if(ch == '+'){
		pCountV[col] += 1;
		}
		else if(ch == '-'){
		nCountV[col] += 1;
		}
	}
	}

	for(int row = 0; row < rules.length; row++){
	if(left[row] != -1){
		if(pCountH[row] != left[row]){
		return false;
		}
	}

	if (right[row] != -1){
		if(nCountH[row] != right[row]){
		return false;
		}
	}

	}


	for(int col = 0; col < rules[0].length; col++){
	if(top[col] != -1){
		if(pCountV[col] != top[col]){
		return false;
		}
	}

	if(bottom[col] != -1){
		if(nCountV[col] != bottom[col]){
		return false;
		}
	}
	// if (top[col] != -1 and pCountH[col] != top[col]) or (bottom[col] != -1 and nCountH[col] != bottom[col]) :
	// return False
	} 


	return true; 
}



public static boolean canPutPatternVertically(char[][] rules,int i,int j, char[] pat){
	if( j-1>=0 && rules[i][j-1] == pat[0]){
	return false;
	}
	else if(i-1>=0 && rules[i-1][j] == pat[0]){
	return false;
	}
	else if(j+1 < rules[0].length && rules[i][j+1] == pat[0]){
	return false;
	}

	return true; 
}

public static void solveMagnetPuzzle(char[][] rules, int i,int j){

	// check the constraint before printing
	if( i == rules.length && j == 0){
	if(checkConstraints(rules)){

		// Printing rules array. 
		System.out.print("[");
		for(int indxi = 0; indxi < rules.length; indxi++){
		System.out.print("[");
		for(int indxj = 0; indxj < rules[0].length; indxj++){
			System.out.print("'" + rules[indxi][indxj] + "', ");
		}
		System.out.print("]");
		}
		System.out.print("]");
	}

	}
	else if(j >= rules[0].length){
	solveMagnetPuzzle(rules, i+1, 0);
	}
	// normal cases
	else{

	if (rules[i][j] == 'L'){

		// option 1 +-
		if(canPutPatternHorizontally(rules,i,j,"+-".toCharArray()) == true){
		rules[i][j] = '+';
		rules[i][j+1] = '-';

		solveMagnetPuzzle(rules,i,j+2);

		rules[i][j] = 'L';
		rules[i][j+1] = 'R';
		}

		// option 2 -+
		if(canPutPatternHorizontally(rules,i,j,"-+".toCharArray()) == true){
		rules[i][j] = '-';
		rules[i][j+1] = '+';

		solveMagnetPuzzle(rules,i,j+2);

		rules[i][j] = 'L';
		rules[i][j+1] = 'R';		 
		}

		// option 3 xx
		if((1 == 1) || canPutPatternHorizontally(rules,i,j,"xx".toCharArray()) == true){
		rules[i][j] = 'x';
		rules[i][j+1] = 'x';

		solveMagnetPuzzle(rules,i,j+2);

		rules[i][j] = 'L';
		rules[i][j+1] = 'R';		 
		}

	}
	// vertical check
	else if(rules[i][j] == 'T'){
		// option 1 +-
		if(canPutPatternVertically(rules,i,j,"+-".toCharArray()) == true){
		rules[i][j] = '+';
		rules[i+1][j] = '-';

		solveMagnetPuzzle(rules,i,j+1);

		rules[i][j] = 'T';
		rules[i+1][j] = 'B';	 
		}

		// option 2 -+
		if(canPutPatternVertically(rules,i,j,"-+".toCharArray()) == true){
		rules[i][j] = '-';
		rules[i+1][j] = '+';

		solveMagnetPuzzle(rules,i,j+1);

		rules[i][j] = 'T';
		rules[i+1][j] = 'B';
		}


		// option 3 xx

		if ((1 == 1) || canPutPatternVertically(rules,i,j,"xx".toCharArray()) == true){
		rules[i][j] = 'x';
		rules[i+1][j] = 'x';

		solveMagnetPuzzle(rules,i,j+1);

		rules[i][j] = 'T';
		rules[i+1][j] = 'B';		 
		}

	}			 
	else{
		solveMagnetPuzzle(rules,i,j+1);
	}
	}
}

public static void doTheStuff(char[][] rules,int i,int j){

	if(rules[i][j] == 'L' || rules[i][j] == 'R'){
	// option 1 +-

	if (canPutPatternHorizontally(rules, i, j ,"+-".toCharArray()) == true){
		rules[i][j] = '+';
		rules[i][j+1] = '-';

		solveMagnetPuzzle(rules,i,j);	 
	}

	// option 2 -+

	// option 3 xx 
	}
}

public static void main(String[] args) {
	char[][] rules = {
	{'L','R','L','R','T','T' },
	{'L','R','L','R','B','B' },
	{'T','T','T','T','L','R' },
	{'B','B','B','B','T','T' },
	{'L','R','L','R','B','B' }
	};
	solveMagnetPuzzle(rules,0,0);
}
}

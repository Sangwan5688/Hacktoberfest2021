/*
    TODO: Crossword Puzzle
    ? https://www.hackerrank.com/challenges/crossword-puzzle/
*/

class Result {
    public static boolean canVertical(int i, int j, String str, char[][] cross) {
        if(j - 1 >= 0 && cross[i][j-1] != '+') return false;
        else if(j + str.length() < cross[0].length && 
            cross[i][j + str.length()] != '+') return false;
            
        for(int k=0;k<str.length();k++) {
            if(j + k >= cross[0].length) return false;
            if(cross[i][j + k] == str.charAt(k) || 
                cross[i][j + k] == '-') continue;
            else return false;
        }
        return true;
    }

    public static boolean[] putVertical(int i, int j, String str, char[][] cross) {
        boolean[] visit = new boolean[str.length()];
        for(int k=0;k<str.length();k++) {
            if(cross[i][j+k] == str.charAt(k)) visit[k] = false;
            else {
                cross[i][j+k] = str.charAt(k);
                visit[k] = true;                                
            }
        }
        return visit;
    }

    public static void removeVertical(int i, int j, boolean[] visit, char[][] cross) {
        for(int k=0;k<visit.length;i++) {
            if(visit[k] == true) {
                cross[i][j+k] = '-';
            }
        }
    }

    public static boolean canHorizontally(int i, int j, String str, char[][] cross) {
        if(i - 1 >= 0 && cross[i-1][j] != '+') return false;
        else if(i + str.length() < cross.length && 
            cross[i+str.length()][j] != '+') return false;
            
        for(int k=0;k<str.length();k++) {
            if(i + k >= cross.length) return false;
            if(cross[i + k][j] == str.charAt(k) || 
                cross[i + k][j] == '-') continue;
            else return false;
        }
        return true;
    }

    public static boolean[] putHorizontally(int i, int j, String str, char[][] cross) {
        boolean[] visit = new boolean[str.length()];
        for(int k=0;k<str.length();k++) {
            if(cross[i+k][j] == str.charAt(k)) visit[k] = false;
            else {
                cross[i+k][j] = str.charAt(k);
                visit[k] = true;                                
            }
        }
        return visit;
    }

    public static void removeHorizontally(int i, int j, boolean[] visit, char[][] cross) {
        for(int k=0;k<visit.length;k++) {
            if(visit[k] == true) {
                cross[i+k][j] = '-';
            }
        }
    }
    
    public static boolean pre(int ind, String[] arr, char[][] cross) {
        if(ind == arr.length) return true;
        
        String str = arr[ind];
        int n = cross.length, m = cross[0].length;
        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                if(cross[i][j] == '-' || cross[i][j] == str.charAt(0)) {
                    if(canVertical(i,j,str,cross)) {
                        boolean[] visit = putVertical(i,j,str,cross);
                        if(pre(ind+1, arr, cross)) return true;
                        removeVertical(i,j,visit,cross); //* 
                    } 
                    if(canHorizontally(i,j,str,cross)) {
                        boolean[] visit = putHorizontally(i,j,str,cross);
                        if(pre(ind+1, arr, cross)) return true;  
                        removeHorizontally(i,j,visit,cross); //*
                    } 
                }
            }
        }
        
        return false;
    }
    
    public static List<String> crosswordPuzzle(List<String> crossword, String words) {
        String[] arr = words.split(";");
        
        int n = crossword.size(), m = crossword.get(0).length();
        char[][] cross = new char[n][m];
        for(int i=0;i<n;i++) {
            for(int j=0;j<m;j++) {
                cross[i][j] = crossword.get(i).charAt(j);
            }
        }
        pre(0, arr, cross);
        
        List<String> ans = new ArrayList<>();
        for(int i=0;i<n;i++) {
            String ds = "";
            for(int j=0;j<m;j++) {
                ds += cross[i][j];
            }
            ans.add(ds);
        }
        return ans;
    }
}
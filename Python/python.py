# A Dynamic Programming based Python 
# KnapSack problem
def knapSack(W, wt, val, n): 
	K = [[0 for x in range(W + 1)] for x in range(n + 1)] 

	for i in range(n + 1): 
		for w in range(W + 1): 
			if i == 0 or w == 0: 
				K[i][w] = 0
			elif wt[i-1] <= w: 
				K[i][w] = max(val[i-1] + K[i-1][w-wt[i-1]], K[i-1][w]) 
			else: 
				K[i][w] = K[i-1][w] 

	return K[n][W] 

# Driver program
val = [30,50,100,70, 40, 20] 
wt = [10, 20, 30,15,35,45] 
W = 50
n = len() 
print(knapSack(W, wt, val, n)) 

# conributed by Mayank Bharto

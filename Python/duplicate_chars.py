from collections import Counter

def find_dup_char(input):

	# now create dictionary using counter method
	# which will have strings as key and their
	# frequencies as value
	WC = Counter(input)
	j = -1
	
	
	# Finding no. of occurrence of a character
	# and get the index of it.
	for i in WC.values():
		j = j + 1
		if( i > 1 ):
			print WC.keys()[j],

# Driver program
if __name__ == "__main__":
	input = 'geeksforgeeks'
	find_dup_char(input)

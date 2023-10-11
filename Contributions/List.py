class listofint:
    '''The class listofint will read and display 
the input given by the user and it will find the largest,sum of the numbers and mean of the input numbers'''

    def __init__(self):
        self.numbers = list()
        self.large = 0

    def read(self):
        a = int(input("Enter the total elements in the list:"))
        for i in range(a):
            try:
                b = int(input("Enter the element{}:".format(i+1)))
                self.numbers.append(b)
            except:
                print("Entered value is not an integer so the value will be zero")
                self.numbers.append(0)

    def display(self):
        for i in range(len(self.numbers)):
            print(self.numbers[i])

    def largest(self):
        for i in range(len(self.numbers)):
            if(self.large < self.numbers[i]):
                self.large = self.numbers[i]
        print("The largest number is {}".format(self.large))

    def sum(self):
        sum = 0
        for i in range(len(self.numbers)):
            sum = sum+self.numbers[i]
        print("The sum is {}".format(sum))

    def mean(self):
        mean = 0
        for i in range(len(self.numbers)):
            mean = mean+self.numbers[i]
        mean = mean/len(self.numbers)
        print("The mean is {}".format(mean))


print(listofint.__doc__)
hello = listofint()
hello.read()
hello.display()
hello.largest()
hello.sum()
hello.mean()

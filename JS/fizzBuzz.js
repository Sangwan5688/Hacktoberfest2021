/* This program prints the numbers from 1 to 100 
and for multiples of ‘3’ print “Fizz” instead 
of the number and for the multiples of ‘5’ print “Buzz”.
And the number is the multiple of both '3' and '5' then print "FizzBuzz" */

var count = 1;

function fizzbuzz() {
  while (count <= 100) {
    
    if (count % 3 === 0 && count % 5 === 0) {
      console.log("FizzBuzz");
    } else if (count % 3 === 0) {
      console.log("Fizz");
    } else if (count % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(count);
    }
    
    count++;
  }
}

fizzbuzz();


// OUTPUT

/*

1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17

.
.
.

88
89
FizzBuzz
91
92
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz

*/
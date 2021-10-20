//Variable declaration of 2 numbers
a=50
b=10

//Operations of calculator
sum=a+b
sub=a-b
mul=a*b
div=a/b
mod=a%b

//Printing all variables
console.log("a=",a)
console.log("b=",b)
console.log("Addition",sum)
console.log("Subtraction",sub)
console.log("Multiplication",mul)
console.log("Division",div)
console.log("Modulus",mod)

//Linking to HTML page
document.getElementById("radd").innerText=sum 
document.getElementById("rsub").innerText=sub 
document.getElementById("rmul").innerText=mul 
document.getElementById("rdiv").innerText=div
document.getElementById("rmod").innerText=mod
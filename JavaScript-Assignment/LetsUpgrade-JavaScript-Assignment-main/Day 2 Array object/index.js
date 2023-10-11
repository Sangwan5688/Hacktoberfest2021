//Array of objects creation

let food=[
    {
        name:"Biriyani",
        price:120,
        quantity:25
    }
    ,
    {
        name:"Meals",
        price:50,
        quantity:60
    }
    ,
    {
        name:"Porotta",
        price:10,
        quantity:100
    }
]


//Adding new object to the array

food.push({name:"Chapathi",price:8, quantity:35});


//for loop to display each object in console

for(let num=0;num<food.length;num++){
    console.log(food[num]);
}


//Displaying all object in console in single line code
console.log(food)





















































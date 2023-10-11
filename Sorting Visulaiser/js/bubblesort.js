//BUBBLE SORT COMPLETE
//MIT LICENSE 2020 
//MADE BY SANDEEP SHAW
//WITHOUT CANVAS


var amt1=20, speed1=37.55;
let bubbleArray = []
var loop1;


$(document).ready(function(){
    $("#b_amount").on("input", function(){
        amt1 = this.value
        bubbleArray = generateBubbleData(amt1,[])
     });
    
     $("#b_speed").on("input", function(){
        speed1 = (1001-this.value)/amt1
     });
    
    //console.log(amt1+", "+speed1)

    //Bubble sort visualization  
    $("#bubble-f").click(function(){
        //console.log("BUBBLE SORT SPEED1")
        //console.log(amt1)
        //console.log("SORT : ",bubbleArray)
        $("#b_amount").prop('disabled', true);
        $("#b_speed").prop('disabled', true);
        $("#bubble-g").prop('disabled', true);
        $("#bubble-f").prop('disabled', true);
        var c = 0;
        var swap = false;
        for (let i = 0; i < amt1-1; i++) {
            for(let j = 0; j<amt1-i-1; j++){
                //c += 1
                if(bubbleArray[j]>bubbleArray[j+1]){
                    swap = true
                    //task1(c,i,j,swap)
                    let temp = bubbleArray[j]
                    bubbleArray[j] = bubbleArray[j+1]
                    bubbleArray[j+1] = temp
                }else{
                    swap = false
                    //task1(c,i,j,swap)
                }
                task1(c,i,j,swap)
            }
        }
        //console.log(bubbleArray)
      });
  });


//Triggers when screen resolution changes
$( window ).resize(function() {
    let divWidth =  $(".chart-bubble").width();
    let margin = 0.1 * divWidth
    let widFactor = ((divWidth - margin)/amt1) + "px";
    $(".chart-bar").css("margin-left", margin/amt1);
    $(".chart-bar").css("margin-right", margin/amt1);
    $(".chart-bar").css("width", widFactor);
});

//Function to generate random number
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Function to swap the nmber
function swap(arr,a,b){
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

//Data generate
function generateBubbleData(amt1, bubbleArray1){
    $(".chart-bubble").empty();
        let divWidth =  $(".chart-bubble").width();
        let margin = 0.1 * divWidth
        let max = 5;
        //min value 5 - max value 1000 Generating Random
        //console.log(divWidth)
        for(i=0;i<amt1;i++){
            bubbleArray1[i] = getRndInteger(10, 1000);
            if(max < bubbleArray1[i]){
                max = bubbleArray1[i];
            }
        }
        //console.log("MAXIUM NUMBER = ",max)
        for(i=0;i<amt1;i++){
            let lenFactor = 95 * (bubbleArray1[i]/max)
            let widFactor = ((divWidth - margin)/amt1)
            $('.chart-bubble').prepend('<div class="chart-bar" style="height : '+ lenFactor +'%; width : '+ widFactor +'px; "></div>')
        }
        //console.log("BUBBLE SORT AMOUNT",amt1)
        $(".chart-bar").css("margin-left", margin/amt1);
        $(".chart-bar").css("margin-right", margin/amt1);
        bubbleArray1 = bubbleArray1.reverse()
        //console.log(bubbleArray1)

        bubbleArray = bubbleArray1

        return bubbleArray1
}

//Visualizing the bars
function task1(time,i,j,swap){
    loop1 = setTimeout(function(){
            //#ffffff
        //representing the unsorted array
        for(let m=0;m<amt1-i;m++){
            $(".chart-bar:nth-child("+(m+1)+")").css("background-color",  " #66ffb5");
        }
       // $(".chart-bar").css("background-color",  "#66ffb5");

        //Swapping the data
        if(swap == true){
            let x = $(".chart-bar:nth-child("+(j+1)+")").height();
            let y = $(".chart-bar:nth-child("+(j+2)+")").height();
            $(".chart-bar:nth-child("+(j+1)+")").css("height",  y);
            $(".chart-bar:nth-child("+(j+2)+")").css("height",  x);
            ////console.log(i+"+"+j+"___ "+swap+" : ("+j+","+(j+1)+") :"+x+" "+y)
            //Representing unsorted array
        }

        //Red bar to high light the swap
        $(".chart-bar:nth-child("+(j+1)+")").css("background-color",  " #ff3333");
        $(".chart-bar:nth-child("+(j+2)+")").css("background-color",  " #ff3333");

        if(amt1 == i+j+2){
            $(".chart-bar:nth-child("+(amt1-i)+")").css("background-color",  "#ffffff");
            ////console.log(i+" + "+j+" qwerty")
        }

        if(i == amt1-2 && j==0){
            $(".chart-bar").css("background-color",  "#ffffff");
            ////console.log(i+","+j)
            $("#b_amount").prop('disabled', false);
            $("#b_speed").prop('disabled', false);
            $("#bubble-g").prop('disabled', false);
            $("#bubble-f").prop('disabled', false);
        }
    }, speed1*time);
}


//Open screen
generateBubbleData(20, [])

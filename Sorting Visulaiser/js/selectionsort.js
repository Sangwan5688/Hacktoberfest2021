//SELECTION SORT 
//MIT LICENSE 2020 
//MADE BY SANDEEP SHAW
//WITHOUT CANVAS


var amt2=20, speed2=37.55;
let selectArray = []
var loop2;


$(document).ready(function(){
    $("#s_amount").on("input", function(){
        amt2 = this.value
        selectArray = generateSelectData(amt2,[])
     });
    
     $("#s_speed").on("input", function(){
        speed2 = (1001-this.value)/amt2
     });
    
    //console.log(amt2+", "+speed2)

    //SELECTION sort visualization  
    $("#select-f").click(function(){
        //console.log("SELECTION SORT SPEED2")
        //console.log(amt2)
        //console.log(selectArray)
        $("#s_amount").prop('disabled', true);
        $("#s_speed").prop('disabled', true);
        $("#select-g").prop('disabled', true);
        $("#select-f").prop('disabled', true);
        var c = 0;
        var swap = false;
        var index;
        for (let i = 0; i < amt2-1; i++) {
            index = i
            for(let j = i+1; j<amt2; j++){
                //c += 1
                if(selectArray[j] < selectArray[index]){
                    index = j
                    swap = true
                    //task2(c,i,j,swap,index)
                }else{
                    swap = false
                    //task2(c,i,j,swap,index)
                }
                task2(c,i,j,swap,index)
                //console.log("("+i+","+j+")"+" : "+selectArray+"__"+index+"___"+selectArray[index])
            }
            let temp = selectArray[i]
            selectArray[i] = selectArray[index]
            selectArray[index] = temp
        }
        //console.log(selectArray)
      });
  });


//Triggers when screen resolution changes
$( window ).resize(function() {
    let divWidth =  $(".chart-select").width();
    let margin = 0.1 * divWidth
    let widFactor = ((divWidth - margin)/amt2) + "px";
    $(".chart-bar1").css("margin-left", margin/amt2);
    $(".chart-bar1").css("margin-right", margin/amt2);
    $(".chart-bar1").css("width", widFactor);
});



//Data generate
function generateSelectData(amt2, selectArray1){
    $(".chart-select").empty();
        let divWidth =  $(".chart-select").width();
        let margin = 0.1 * divWidth
        let max = 5;
        //min value 5 - max value 1000 Generating Random
        //console.log(divWidth)
        for(i=0;i<amt2;i++){
            selectArray1[i] = getRndInteger(10, 1000);
            if(max < selectArray1[i]){
                max = selectArray1[i];
            }
        }
        //console.log("MAXIUM NUMBER = ",max)
        for(i=0;i<amt2;i++){
            let lenFactor = 95 * (selectArray1[i]/max)
            let widFactor = ((divWidth - margin)/amt2)
            $('.chart-select').prepend('<div class="chart-bar1" style="height : '+ lenFactor +'%; width : '+ widFactor +'px; "></div>')
        }
        //console.log("SELECTION SORT AMOUNT",amt2)
        $(".chart-bar1").css("margin-left", margin/amt2);
        $(".chart-bar1").css("margin-right", margin/amt2);
        selectArray1 = selectArray1.reverse()
        //console.log(selectArray1)

        selectArray = selectArray1

        return selectArray1
}

//Visualizing the bars
function task2(time,i,j,swap,index){
    loop2 = setTimeout(function(){
        //representing the unsorted array
        $(".chart-bar1").css("background-color",  "#66ffb5");

        for(let m=0;m<=i;m++){
            $(".chart-bar1:nth-child("+(m+1)+")").css("background-color",  "#ffffff");
            if(m==i){
                $(".chart-bar1:nth-child("+(m+1)+")").css("background-color",  "#ffcc00");
            }
        }


        if(i==index){
            $(".chart-bar1:nth-child("+(i+1)+")").css("background-color",  "#ff3333");
        }else{
            $(".chart-bar1:nth-child("+(index+1)+")").css("background-color",  "#ff3333");
        }
        $(".chart-bar1:nth-child("+(j+1)+")").css("background-color",  "#ff3333");

        if(amt2 == j+1){
            let x = $(".chart-bar1:nth-child("+(i+1)+")").height();
            let y = $(".chart-bar1:nth-child("+(index+1)+")").height();
            $(".chart-bar1:nth-child("+(i+1)+")").css("height",  y);
            $(".chart-bar1:nth-child("+(index+1)+")").css("height",  x);
        }


        if(i == amt2-2 ){
            $(".chart-bar1").css("background-color",  "#ffffff");
            ////console.log(i+","+j)
            $("#s_amount").prop('disabled', false);
            $("#s_speed").prop('disabled', false);
            $("#select-g").prop('disabled', false);
            $("#select-f").prop('disabled', false);
        }
    }, speed2*time);
    //console.log(i+":"+j+":"+swap+":"+index)
}


//Open screen
generateSelectData(20, [])

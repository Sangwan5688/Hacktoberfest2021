//INSERT SORT COMPLETE
//MIT LICENSE 2020 
//MADE BY SANDEEP SHAW
//WITHOUT CANVAS


var amt3=20, speed3=37.55;
let insertArray = []
var loop3;


$(document).ready(function(){
    $("#i_amount").on("input", function(){
        amt3 = this.value
        insertArray = generateInsertData(amt3,[])
     });
    
     $("#i_speed").on("input", function(){
        speed3 = (1001-this.value)/amt3
     });
    
    //console.log(amt3+", "+speed3)

    //INSERT sort visualization  
    $("#insert-f").click(function(){
        //console.log("INSERT SORT SPEED3")
        //console.log(amt3)
        //console.log(insertArray)
        $("#i_amount").prop('disabled', true);
        $("#i_speed").prop('disabled', true);
        $("#insert-g").prop('disabled', true);
        $("#insert-f").prop('disabled', true);
        var c = 0;
        var swap = "";
        var key;
        for (let i = 1; i < amt3; ++i) {
            key = insertArray[i]
            let j = i - 1
            while(j>=0 && insertArray[j] > key){
                c++
                swap = "while"
                insertArray[j+1] = insertArray[j]
                task3(c,i,j,swap)
                j--
            }
            insertArray[j+1] = key
        }
        //console.log(insertArray)
        if(c==0){
            window.alert("Data is Sorted")
            $(".chart-bar2").css("background-color",  "#ffffff");
            ////console.log(i+","+j)
            $("#i_amount").prop('disabled', false);
            $("#i_speed").prop('disabled', false);
            $("#insert-g").prop('disabled', false);
            $("#insert-f").prop('disabled', false);
        }
      });
  });


//Triggers when screen resolution changes
$( window ).resize(function() {
    let divWidth =  $(".chart-insert").width();
    let margin = 0.1 * divWidth
    let widFactor = ((divWidth - margin)/amt3) + "px";
    $(".chart-bar2").css("margin-left", margin/amt3);
    $(".chart-bar2").css("margin-right", margin/amt3);
    $(".chart-bar2").css("width", widFactor);
});



//Data generate
function generateInsertData(amt3, insertArray1){
    $(".chart-insert").empty();
        let divWidth =  $(".chart-insert").width();
        let margin = 0.1 * divWidth
        let max = 5;
        //min value 5 - max value 1000 Generating Random
        //console.log(divWidth)
        for(i=0;i<amt3;i++){
            insertArray1[i] = getRndInteger(10, 1000);
            if(max < insertArray1[i]){
                max = insertArray1[i];
            }
        }
        //console.log("MAXIUM NUMBER = ",max)
        for(i=0;i<amt3;i++){
            let lenFactor = 95 * (insertArray1[i]/max)
            let widFactor = ((divWidth - margin)/amt3)
            $('.chart-insert').prepend('<div class="chart-bar2" style="height : '+ lenFactor +'%; width : '+ widFactor +'px; "></div>')
        }
        //console.log("INSERT SORT AMOUNT",amt3)
        $(".chart-bar2").css("margin-left", margin/amt3);
        $(".chart-bar2").css("margin-right", margin/amt3);
        insertArray1 = insertArray1.reverse()
        //console.log(insertArray1)

        insertArray = insertArray1

        return insertArray1
}

//Visualizing the bars
function task3(time,i,j,swap){
    loop3 = setTimeout(function(){
        //representing the unsorted array
        for(let m=0;m<=i;m++){
            if(m==i){
                $(".chart-bar2:nth-child("+(m+1)+")").css("background-color",  "yellow");
            }else if(m==j){
                $(".chart-bar2:nth-child("+(m+1)+")").css("background-color",  "red");
                $(".chart-bar2:nth-child("+(m+2)+")").css("background-color",  "red");
            }else{
                $(".chart-bar2:nth-child("+(m+1)+")").css("background-color",  "#ffffff");
            }
        }    
        if(swap=="while"){
            let x = $(".chart-bar2:nth-child("+(j+2)+")").height();
            let y = $(".chart-bar2:nth-child("+(j+1)+")").height();
            $(".chart-bar2:nth-child("+(j+2)+")").css("height",  y);
            $(".chart-bar2:nth-child("+(j+1)+")").css("height",  x);
        }

        

        if(i == amt3-1 ){
                $(".chart-bar2").css("background-color",  "#ffffff");
                ////console.log(i+","+j)
                $("#i_amount").prop('disabled', false);
                $("#i_speed").prop('disabled', false);
                $("#insert-g").prop('disabled', false);
                $("#insert-f").prop('disabled', false);
        }

    }, speed3*time);
    //console.log(i+":"+j+":"+swap+":"+index)
}

//Open screen
generateInsertData(20, [])

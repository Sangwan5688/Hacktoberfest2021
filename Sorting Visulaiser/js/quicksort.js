//QUICK SORT COMPLETE
//MIT LICENSE 2020 
//MADE BY SANDEEP SHAW
//WITHOUT CANVAS


var amt4=20, speed4=37.55;
let quickArray = []
var loop4;
var quickcount = 0


$(document).ready(function(){
    $("#q_amount").on("input", function(){
        amt4 = this.value
        quickArray = generateQuicktData(amt4,[])
     });
    
     $("#q_speed").on("input", function(){
        speed4 = (1001-this.value)/amt4
     });
    
    //console.log(amt4+", "+speed4)

    //INSERT sort visualization  
    $("#quick-f").click(function(){
        $(".chart-bar3").css("background-color",  "#66ffb5");
        
        //$("#q_amount").prop('disabled', true);
        //$("#q_speed").prop('disabled', true);
        //$("#quick-g").prop('disabled', true);
        //$("#quick-f").prop('disabled', true);
        quickcount = 0
        QuickSort(quickArray, 0, amt4-1);
        task4(quickcount++,null,null,"end")
        //console.log(quickArray)
      });
  });


//Triggers when screen resolution changes
$( window ).resize(function() {
    let divWidth =  $(".chart-quick").width();
    let margin = 0.1 * divWidth
    let widFactor = ((divWidth - margin)/amt4) + "px";
    $(".chart-bar3").css("margin-left", margin/amt4);
    $(".chart-bar3").css("margin-right", margin/amt4);
    $(".chart-bar3").css("width", widFactor);
});



//Data generate
function generateQuicktData(amt4, quickArray1){
    $(".chart-quick").empty();
        let divWidth =  $(".chart-quick").width();
        let margin = 0.1 * divWidth
        let max = 5;
        //min value 5 - max value 1000 Generating Random
        //console.log(divWidth)
        for(i=0;i<amt4;i++){
            quickArray1[i] = getRndInteger(10, 1000);
            if(max < quickArray1[i]){
                max = quickArray1[i];
            }
        }
        //console.log("MAXIUM NUMBER = ",max)
        for(i=0;i<amt4;i++){
            let lenFactor = 95 * (quickArray1[i]/max)
            let widFactor = ((divWidth - margin)/amt4)
            $('.chart-quick').prepend('<div class="chart-bar3" style="height : '+ lenFactor +'%; width : '+ widFactor +'px; "></div>')
        }
        //console.log("INSERT SORT AMOUNT",amt4)
        $(".chart-bar3").css("margin-left", margin/amt4);
        $(".chart-bar3").css("margin-right", margin/amt4);
        quickArray1 = quickArray1.reverse()
        //console.log(quickArray1)

        quickArray = quickArray1

        return quickArray1
}

//Visualizing the bars
function task4(time,i,j,swap){
    loop4 = setTimeout(function(){
        //representing the unsorted array
        for(let m=0;m<=j;m++){
            if(m==i){
                $(".chart-bar3:nth-child("+(i+1)+")").css("background-color",  "yellow");
            }else if(m==j){
                $(".chart-bar3:nth-child("+(j+1)+")").css("background-color",  "red");
            }else{
                $(".chart-bar3:nth-child("+(m+1)+")").css("background-color",  "#ffffff");
            }
        }
        

        if(swap == "for"){
            let x = $(".chart-bar3:nth-child("+(j+1)+")").height();
            let y = $(".chart-bar3:nth-child("+(i+1)+")").height();
            $(".chart-bar3:nth-child("+(j+1)+")").css("height",  y);
            $(".chart-bar3:nth-child("+(i+1)+")").css("height",  x);
        }

        if(swap == "forall"){
            let x = $(".chart-bar3:nth-child("+(j+1)+")").height();
            let y = $(".chart-bar3:nth-child("+(i+1)+")").height();
            $(".chart-bar3:nth-child("+(j+1)+")").css("height",  y);
            $(".chart-bar3:nth-child("+(i+1)+")").css("height",  x);
        }

        if(swap=="end"){
            $(".chart-bar3").css("background-color",  "#ffffff");
            ////console.log(i+","+j)
            $("#q_amount").prop('disabled', false);
            $("#q_speed").prop('disabled', false);
            $("#quick-g").prop('disabled', false);
            $("#quick-f").prop('disabled', false);
            //console.log(quickcount)
            setTimeout(
                function() 
                {
                    window.alert("AUTOMATIC PAGE REFRESH \n RELEASE HEAP MEMORY : FOR BETTER PERFORMANCE")
                    location.reload();
                }, 1000);
        }


    }, speed4*time);
    //console.log(i+":"+j+":"+swap+":"+index)
}

//Open screen
generateQuicktData(20, [])


//QUICK SORT
function QuickSort(arr,low,high){
    if(low < high){
        let par = QuickPartition(arr,low,high)
        QuickSort(arr,low,par-1)
        QuickSort(arr,par+1,high)
    }
}

function QuickPartition(arr, low, high) 
{ 
    var pivot = arr[high];  
    var i = (low-1);
    var swap = false;  
    for (var j=low; j<high; j++) 
    {  
        if (arr[j] < pivot) 
        { 
            i++; 
            let temp = arr[i]; 
            arr[i] = arr[j]; 
            arr[j] = temp;
            //console.log(i+","+j+", a(i)="+arr[i]+", a(j)="+arr[j])
            swap = "for"
        }else{
            swap = "notfor"
        }
        task4(quickcount++,i,j,swap)
    } 

    swap = "forall"
    var temp = arr[i+1]; 
    arr[i+1] = arr[high]; 
    arr[high] = temp; 
    task4(quickcount,i+1,high,swap)

    return i+1; 
}

$(document).ready(function(){
        //BUBBLE-Slider=============================
        let x1 = $("#b_amount").value
        let y1 = $("#b_speed").value
    
        if(x1==undefined){x1 = 20}
        if(y1==undefined){y1 = 850}
    
        $("#b_amount_val").html(x1)
        $("#b_speed_val").html(y1)
    
        $("#b_amount").on("input", function(){
           $("#b_amount_val").html(this.value) 
        });
    
        $("#b_speed").on("input", function(){
           $("#b_speed_val").html(this.value)
        });
        //End of Slider======================
        //Selection-Slider=============================
        let x2 = $("#s_amount").value
        let y2 = $("#s_speed").value            
        if(x2==undefined){x2 = 20}
        if(y2==undefined){y2 = 850}            
        $("#s_amount_val").html(x2)
        $("#s_speed_val").html(y2)            
        $("#s_amount").on("input", function(){
            $("#s_amount_val").html(this.value) 
        });            
        $("#s_speed").on("input", function(){
            $("#s_speed_val").html(this.value)
        });
        //End of Slider======================
        //Selection-Slider=============================
        let x3 = $("#i_amount").value
        let y3 = $("#i_speed").value            
        if(x3==undefined){x3 = 20}
        if(y3==undefined){y3 = 850}            
        $("#i_amount_val").html(x3)
        $("#i_speed_val").html(y3)            
        $("#i_amount").on("input", function(){
            $("#i_amount_val").html(this.value) 
        });            
        $("#i_speed").on("input", function(){
            $("#i_speed_val").html(this.value)
        });
        //End of Slider======================
        //Selection-Slider=============================
        let x4 = $("#q_amount").value
        let y4 = $("#q_speed").value            
        if(x4==undefined){x4 = 20}
        if(y4==undefined){y4 = 850}            
        $("#q_amount_val").html(x4)
        $("#q_speed_val").html(y4)            
        $("#q_amount").on("input", function(){
            $("#q_amount_val").html(this.value) 
        });            
        $("#q_speed").on("input", function(){
            $("#q_speed_val").html(this.value)
        });
        //End of Slider======================
});
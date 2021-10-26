$(document).ready(function(){

    //Alert2
     setTimeout(
     function(){
        //window.alert("THIS PAGE IS UNDER DEVELOPMENT, HOPE YOU LIKE IT !");
     }, 1000);

    //Main function copy to clip board
    $("#copyText").on("click", function(){

        var $temp = $("<textarea>");
        $("body").append($temp);
        var html = $("#fetch-code").html();
        html = html.replace(/\<div\>/g, "\n"); // or \r\n
        html = html.replace(/\<\/div>/g, ""); // or \r\n
        html = html.replace(/&lt;/g, "<"); // or \r\n
        html = html.replace(/&gt;/g, ">"); // or \r\n
        html = html.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "    "); // or \r\n
        html = html.replace(/&nbsp;/g, ""); // or \r\n
        html = html.replace(/&amp;/g, "&"); // or \r\n
        console.log(html);
        $temp.val(html).select();
        document.execCommand("copy");
        $temp.remove();

        $(".copy-alert").removeClass("disappear")
        $(".copy-alert").addClass("appear")
        setTimeout(function(){ 
            $(".copy-alert").removeClass("appear")
            $(".copy-alert").addClass("disappear")
        }, 1500);
    });

    $(".footer-link-items a, #sorry").on("click", function(){
        
        $(".sorry-alert").removeClass("disappear")
        $(".sorry-alert").addClass("appear")
        setTimeout(function(){ 
            $(".sorry-alert").removeClass("appear")
            $(".sorry-alert").addClass("disappear")
        }, 3000);

    });

});
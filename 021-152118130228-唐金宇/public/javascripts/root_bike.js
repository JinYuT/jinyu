$(function(){
    $(".del").click(function(){
       
        var bike_id = $(this).attr("bike_id");

        $.ajax({
            url : "/ajax/bike_del",
            data : {id:bike_id},
            type : "get",
            success : function(info){
                if(info.code == 2){
                    alert("del success!");
                    location.reload();
                }else{
                    alert("del fail!")

                }
            }
        })
    }) ;
});
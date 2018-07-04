
$(function(){
    $(".del").click(function(){
       
        var tic_id = $(this).attr("tic_id");

        $.ajax({
            url : "/ajax/root_ticket_del",
            data : {id:tic_id},
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
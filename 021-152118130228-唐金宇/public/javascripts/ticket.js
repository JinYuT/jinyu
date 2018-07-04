$(function(){
    document.body.parentNode.style.overflow = "hidden";
    $(".add").click(function(){
        let id = $(this).attr("tic_id");
        let begin =$(this).parent("li").find(".begin").attr("tic_begin");
        let end = $(this).parent("li").find(".end").attr("tic_end");
        let time = $(this).parent("li").find(".time").attr("tic_time");
        let number = $(this).parent("li").find(".number").attr("tic_number");
        let price = $(this).parent("li").find(".price").attr("tic_price");
      console.log(end);
        let data = {
                
                begin : begin,
                end : end,
                time : time,
                number : number,
                price : price
        
        }
        $.ajax({
            url : "/ajax/add_ticket",
            data : data,
            type : "post",
            success : function(info){
                if(info.code == 2){
                    alert("success!")
                }else{
                    alert("error,请联系管理员!")

                }
            }
        })

    })

    
})
$("#btn").click(function(){

    var nb = $("#nb").val();
    let data = {
        number:nb
    }
    $.ajax({
        url:"/ajax/bike",
        type:"post",
        data:data,
        success:function(info){
                if(info.aut){
                   $(".password").html(info.aut)
                }else{
                    alert("not find");
                }
        }
    })
})
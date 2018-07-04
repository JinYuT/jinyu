$(function(){
    $(".goods-box").submit(function(e){

        e.preventDefault();

      

            var data = {
                number : this.number.value,
                password : this.password.value,
               
            }

            $.ajax({

                url : "/ajax/bikeinput",
                data : data,
                type : "post",
                success : function(info){
                    if(info.code == 2){
                        alert("bike is input");
                    }else{
                        alert("bike not input,error");
                    }
                }
            })
        
    })


})

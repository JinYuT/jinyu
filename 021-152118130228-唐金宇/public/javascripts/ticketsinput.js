$(function(){
    $(".goods-box").submit(function(e){

        e.preventDefault();

      

            var data = {
                begin : this.begin.value,
                end : this.end.value,
                time : this.time.value,
                number : this.number.value,
                price : this.price.value
            }

            $.ajax({

                url : "/ajax/ticketsinput",
                data : data,
                type : "post",
                success : function(info){
                    if(info.code == 2){
                        alert("ticket is input");
                    }else{
                        alert("ticket not input,error");
                    }
                }
            })
        
    })


})

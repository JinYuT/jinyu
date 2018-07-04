$(function(){
    document.body.parentNode.style.overflow = "hidden";



    $("#username").change(function(){
        $.ajax({
            url : "/ajax/hasUser",
            data : {username : this.value},
            type : "get",
            success : function(info){
                if(info.num == 0){
                    $(".message").text("用户名可用");
                    $(".message").attr("class","message suc")
                }else{
                    $(".message").text("用户已存在,请重新输入!");
                    $(".message").attr("class","message err")
                }
            }
        })
    });

    $(".user-box").submit(function(e){
        
        e.preventDefault();

        var data = {
            username : this.username.value,
            password : this.password.value
        }

        $.ajax({
            url : "/ajax/register",
            data : data,
            type : "post",
            success : function(info){
                if(info.aut == 1){
                    alert("注册成功");
                    
                   window.location.href = "/login";
                }else if(info.aut == 0){
                    alert("注册失败,请联系管理员!")
                }else if(info.aut == 2){
                    alert("用户名已存在,请重新注册!")
                }
            },
            error:function(a,b,c){
                console.log(a,b,c);
            }
        })
    })
});
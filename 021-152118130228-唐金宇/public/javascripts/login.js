$(function(){
	document.body.parentNode.style.overflow = "hidden";
    $(".user-box").submit(function(e){
        e.preventDefault();

        var data = {
            username : this.username.value,
            password : this.password.value
        }

        $.ajax({
            url:"/ajax/login",
            type:"post",
            data:data,
            success:function(info){
                    if(info.aut){
                        alert("login success");
                        window.location.href="http://127.0.0.1:3000/"
                    }else{
                        alert("login fail");
                    }
            }
        })
    })
})
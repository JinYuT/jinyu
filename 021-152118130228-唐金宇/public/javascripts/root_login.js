$(function(){
	document.body.parentNode.style.overflow = "hidden";
    $(".user-box").submit(function(e){
        e.preventDefault();

        var data = {
            username : this.username.value,
            password : this.password.value
        }

        $.ajax({
            url:"/ajax/root_login",
            type:"post",
            data:data,
            success:function(info){
                    if(info.aut){
                        alert(" root login success");
                        window.location.href="http://127.0.0.1:3000/root"
                    }else{
                        alert("root login fail");
                    }
            }
        })
    })
})
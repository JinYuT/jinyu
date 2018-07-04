var express = require('express');
var router = express.Router();
let getColl = require("../db/getColl")
let jm = require("../tools/jm")
let oid = require("objectid");

/* GET home page. */
//
router.post('/login', function(req, res, next) {
  let {body:user} = req;

  let userColl = getColl("users");

  userColl.find({username:user.username}).toArray((err,list)=>{
    if(list.length != 0){//用户名存在
      let dbUser = list[0];

      user.password = jm(user.password);
      //对比密码是否正确
      if(user.password == dbUser.password){
        //登录成功后 将数据库内获取到的用户信息存放到session上
        req.session.userObj = dbUser;
        res.json({aut:true});
        // res.redirect("/index");
      }else{
        res.json({aut:false});
      }

    }else{//用户输入的用户名不存在
      res.json({aut:false});
    }
  })


  // session  : 会话
});

router.post('/register', function(req, res, next) {
  let {body:user} = req;
  
  let userColl = getColl("users");
  user.password = jm(user.password);

  userColl.find({username:user.username}).toArray((err,list)=>{
    if(list.length == 0){
      //用户名不存在,才能注册
      userColl.insert(user,(err,info)=>{
        if(!err){
          res.json({aut:1});
        }else{
          res.json({aut:0});
        }
      })

    }else{
      res.json({aut:2});
    }
  })


});


router.get("/hasuser",(req,res)=>{
  let {username} = req.query;

  let userColl = getColl("users");

  userColl.find({username}).toArray((err,list)=>{
    let hasUser = list.length;

    res.json({num : hasUser});
  })
})




router.post("/ticketsinput",(req,res)=>{
  let {rootUser} = req.session;

  if(rootUser){//用户登录了 才会允许执行该ajax请求
    let {body:tickets} = req;
    console.log(req.body)
    let tic = getColl("tickets");

  
    //将车票信息写入到数据库
    tic.insert(tickets,(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
        res.json({
          code : 0
        })
      }
    })

  }else{
    res.json({
      code : 1
    })
  }
  
});



router.get("/del",(req,res)=>{
  // 获取需要被删除的ID
  let {id} = req.query;

  if(id){
    id = oid(id);

    let tic = getColl("user_tic");

    tic.remove({_id:id},(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
          res.json({
            code : 0
          })
      }
    })
  }else{
    res.end();
  }
});

router.get("/bike_del",(req,res)=>{
  // 获取需要被删除的ID
  let {id} = req.query;

  if(id){
    id = oid(id);

    let bike = getColl("bike");

    bike.remove({_id:id},(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
          res.json({
            code : 0
          })
      }
    })
  }else{
    res.end();
  }
});

router.get("/root_ticket_del",(req,res)=>{
  // 获取需要被删除的ID
  let {id} = req.query;

  if(id){
    id = oid(id);

    let tic = getColl("tickets");

    tic.remove({_id:id},(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
          res.json({
            code : 0
          })
      }
    })
  }else{
    res.end();
  }
});
router.post("/add_ticket",(req,res)=>{
   let {userObj} = req.session;
   let userid = userObj.username;
   let {body} = req;
   console.log(userid);
   console.log(body);
   body.userid = userid;
   if(userid){
     let add = getColl("user_tic");
     add.insert(body,(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
          res.json({
            code : 0
          })
      }
     })
   }
 
})



router.post('/root_login', function(req, res, next) {
  let {body:user} = req;

  if(user.username=="root"&&user.password=="123456"){
    req.session.rootUser = {
      username:"root",
      password:"123456"
    }
    res.json({aut:true});
  }else{
    res.json({aut:false});
  }
  // session  : 会话
});

router.post("/bikeinput",(req,res)=>{
  let {rootUser} = req.session;

  if(rootUser){//用户登录了 才会允许执行该ajax请求
    let {body:bike} = req;
    console.log(req.body)
    let bi = getColl("bike");
    //将车票信息写入到数据库
    bi.insert(bike,(err,info)=>{
      if(!err){
        res.json({
          code : 2
        })
      }else{
        res.json({
          code : 0
        })
      }
    })

  }else{
    res.json({
      code : 1
    })
  }
  
});


router.post('/bike', function(req, res, next) {
  let {body:nb} = req;
  let bi = getColl("bike");
  bi.find(nb).toArray((err,list)=>{
    if(list.length != 0){
      //用户名存在
      let bike = list[0];
      // console.log(list);
      if(bike.password){  
        res.json({aut:bike.password});
        // res.redirect("/index");
      }else{
        res.json({aut:false});
      }
    }else{
      res.json({aut:false});
    }
  })
});
module.exports = router;

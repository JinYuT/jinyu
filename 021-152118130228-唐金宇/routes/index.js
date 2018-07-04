var express = require('express');
var router = express.Router();
let getColl = require("../db/getColl");
let oid = require("objectid");

/* GET home page. */
router.get('/', function(req, res, next) {
 let isLogin = !!req.session.userObj;
 if(isLogin){
  res.render('index');
}else{
  res.render('login');
}

});

router.get('/bike', function(req, res, next) {
  let isLogin = !!req.session.userObj;
  if(isLogin){
   res.render('bike',{title:"用车"});
 }else{
   res.render('login');
 }
 
 });


router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/register', function(req, res, next) {
  res.render('register');
});


router.get('/ticket', function(req, res, next) {

  
  let tic = getColl("tickets");

  tic.find().toArray((err,list)=>{

    res.render('ticket',{list});
  })
 
});

router.get('/usercenter', function(req, res, next) {

  

      let userid = req.session.userObj.username;
      let user_tic = getColl("user_tic");
     
      // var info_arr=[];
      user_tic.find({userid:userid}).toArray((err,info)=>{
         
        res.render("usercenter",{info})
         
      })

     
   

});






router.get('/root', function(req, res, next) {
  let isLogin = !!req.session.rootUser;
  if(isLogin){
   res.render('root');
 }else{
   res.render('root_login');
 }
});


router.get('/root_ticket', function(req, res, next) {
  let isLogin = !!req.session.rootUser;
  if(isLogin){

    let tic = getColl("tickets");

  tic.find().toArray((err,list)=>{

    res.render('root_ticket',{list});
  })
  }else{
    res.render('root_login');
  }
});

router.get('/root_bike', function(req, res, next) {
  let isLogin = !!req.session.rootUser;
  if(isLogin){

    let bi = getColl("bike");

  bi.find().toArray((err,list)=>{

    res.render('root_bike',{list});
  })
  }else{
    res.render('root_login');
  }
});

router.get('/bike_input', function(req, res, next) {
  let isLogin = !!req.session.rootUser;
  if(isLogin){
    res.render('bikeinput');
  }else{
    res.render('root_login');
  }
});


router.get('/input', function(req, res, next) {
  let isLogin = !!req.session.rootUser;
  if(isLogin){
    res.render('ticketsinput');
  }else{
    res.render('root_login');
  }
});

module.exports = router;

let mc = require("mongodb").MongoClient;
const DB_URL = "mongodb://localhost:27017/bishe";
let dbObj = null;
mc.connect(DB_URL,(err,db)=>{
    if(!err){
        console.log("mongo is running......");
        dbObj = db;
    }else{
        console.log("mongo is error::::");
        console.log(err);
    }
});
module.exports = collName => dbObj.collection(collName);

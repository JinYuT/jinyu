var fnv = require("fnv-plus");

module.exports = () => {
    var date = new Date();
    
    var times = date.getTime();
    
    var hash = fnv.hash("a"+times,64).str();
    return hash;
}

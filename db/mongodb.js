const mongoose = require("mongoose");
const CONFIG = require("../config/config");
// const logger = require("../logging/logger")
function connectionToDb() {
mongoose.connect(CONFIG.MONGODB_URL)
mongoose.connection.on("connected" , ()=>{
//    logger.info("MongoDb connected succesfully");
console.log("MongoDb connected succesfully");
})
mongoose.connection.on("error",(err)=>{console.log("Connection error")})

}

module.exports = connectionToDb;
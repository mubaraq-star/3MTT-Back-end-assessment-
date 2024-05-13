const mongoose = require("mongoose");
const CONFIG = require("../config/config");
const logger = require("../logging/logger")
function connectionToDb() {
mongoose.connect(CONFIG.MONGODB_URL)
mongoose.connection.on("connected" , ()=>{
//    logger.info("MongoDb connected succesfully");
logger.info("MongoDb connected succesfully");
})
mongoose.connection.on("error",(err)=>{logger.error("Connection error")})

}

module.exports = connectionToDb;
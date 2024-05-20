const  mongoose = require('mongoose');
const colors  = require('colors')

const connectDb = async()=>{
try {
    const con = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connectd  To MongoDb Database ${con.connection.host}`.bgYellow.bgWhite)
              
    
} catch (error) {
    console.log(`Error is mongoDb ${error}`.bgRed.white)
}
}
module.exports = {
    connectDb
}
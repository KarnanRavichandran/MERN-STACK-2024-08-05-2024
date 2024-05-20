const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { connectDb } = require('./config/db');
const morgan = require('morgan');
const authRouter = require('./routes/authRoute');
const cors = require('cors');
const categoryRouter = require('./routes/CategoryRoute');
const productRouter = require('./routes/ProductRoute');
const path =require('path')

// configure file
dotenv.config();

const  app = express();

// database config
connectDb();

// rest obj
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,"./client/build")))

const port = process.env.PORT || 8000;

app.get('/',(req,res,next)=>{
  res.send('Workin fine karnan')
})

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRouter)

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(port,()=>{
    console.log(`node js working fine karnan ${port}`.bgMagenta.bgGreen)
})
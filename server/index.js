import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv';
import morgan from 'morgan';
import Conndb from './config/db.js';
import authRoutes from "./routes/authRoute.js"
import cors from 'cors'
//configure env
dotenv.config()

//datbase config
Conndb();

//rest object
const app=express();

//middleware
app.use(cors()) //agar do server ko add karenga to problem nhi hogi cors saa
app.use(express.json())//req and resp ma json data bhaj sakta hai
app.use(morgan('dev'))

//Routes
app.use('/api/v1/auth',authRoutes);

//rest api
app.get('/',(req,resp)=>{
    resp.send({
        msg:'welcome to ecommerce site'
    })
})


//PORT
const PORT=process.env.PORT||8080;

//run listen
app.listen(PORT,()=>{
     console.log(`server running on ${PORT}`.bgCyan.white)
})
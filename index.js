const express= require('express');
const app= express();
app.use(express.json())


const connection =require('./config/db')
const userRouter= require('./routes/user.route')

const dotenv=require('dotenv')
dotenv.config()

let Port= process.env.PORT
app.get('/',(req,res)=>{
    res.send('home')
})

app.use('/user', userRouter)

app.listen( Port, async()=>{
    await connection
    console.log("listening on port "+Port)
})
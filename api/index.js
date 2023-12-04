const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express =require('express');
const path=require("path")
const app=express();
const _dirname=path.resolve();
const cookieParser = require('cookie-parser');
dotenv.config({path:'./config.env'})
require('./db/conn');
//const User= require('./model/userSchema');
app.use(express.json());
app.use(cookieParser());

//we make the router files to make our route easy
app.use(require('./router/auth'));

app.use(express.static(path.join(_dirname, 'client', 'dist')));
app.get('*', (req, res, next)=>{
    res.sendFile(path.join(_dirname, 'client','dist','index.html'));
})

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at port no. ${PORT}`)
})


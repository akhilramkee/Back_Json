const express = require('express');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const upload = multer({storage:multer.memoryStorage()})


app.use(cookieparser());
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'trolololo',
}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    return res.send("Hello server up and running");
})

app.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.session.jsonData){
        req.session.jsonData ={}
    }
    let key = req.file.originalname.replace('.json','');
    let value = JSON.parse(req.file.buffer.toString('utf-8'));
    req.session.jsonData[key] = value;
    res.status(200).json(req.session.jsonData);
});

app.get('/purge',(req,res)=>{
    if(req.session.jsonData){
        req.session.jsonData = {};
    }
    res.status(200).send("Purged")
})

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log("Server is up and running on port ", PORT)
})
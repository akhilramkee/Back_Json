const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

let jsonData = {};

const upload = multer({storage:multer.memoryStorage()})

app.use(express.json())
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
    let key = req.file.originalname.replace('.json','');
    let value = JSON.parse(req.file.buffer.toString('utf-8'));
    jsonData[key] = value;
    res.json(jsonData)
});

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log("Server is up and running on port ", PORT)
})
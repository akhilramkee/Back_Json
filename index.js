const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const directoryPath = path.join(__dirname,'uploads');
var X_files = [];

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const upload = multer({storage:storage})

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
    X_files.push(req.file.originalname);
    res.json(X_files);
});

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log("Server is up and running on port ", PORT)
})
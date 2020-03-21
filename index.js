const express = require('express');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var cors = require('cors');



const upload = multer({storage:multer.memoryStorage()})

app.use(cookieparser());
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'trolololo',
}));

app.use(cors({credentials:true,origin:'http://localhost:3000'}))

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

/*
app.get('/download',(req,res)=>{
    files = []
    Object.entries(req.session.jsonData).forEach(function([key,value]){
        files.push(key+'.json');
        let data = JSON.stringify(value);
        fs.writeFileSync(key+'.json',data);
        var file = fs.createWriteStream(key+'.json')
        res.on('finish',function(){

        }).pipe(file)
    });
})*/


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
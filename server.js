const express = require('express');
const path    = require('path');
const fs      = require('fs');
const { error } = require('console');
const app     = express();
const PORT    = process.env.PORT || 3000;



app.use((req,res,next)=>{
    console.log("Request Data", new Date());
    next();
})

app.use((req,res,next)=>{
    const filepath = path.join(__dirname,"static",req.url);
    fs.stat(filepath,(err,fileinfo)=>{
        if(err){
            next();
            return
        }
        else if(fileinfo.isFile()){
            res.sendFile(filepath)
        }
        else{
            next();
        }
    })
})

app.use((req,res)=>{
    res.status(404);
    res.send('File not Found')
})


app.listen(PORT,()=>{
    console.log(`The app is running on port : ${PORT}`)
})
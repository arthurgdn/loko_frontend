const path = require('path')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname,'..','public')

app.use(express.static(publicPath))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,PATCH")
    next();
    });
const port = process.env.PORT || 8080

app.get('*',(req,res)=>{
    res.sendFile(path.join(publicPath,'index.html'))
})

app.listen(port,()=>console.log('Server is up on port '+ port))
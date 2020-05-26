const express = require ("express");
const fs = require('fs')
const path = require('path')
const app = express();
const PORT = 3000;
const db = require('./db/db.json')
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'))


app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/api/notes', (req,res)=>{
    res.json(db)
})


app.delete('/api/notes/:id', function(req,res){
    console.log(req.params.id)
    //delete from db;
    db.splice(req.params.id, 1)
    //update db.json using fs.writefile
    fs.writeFile("./db/db.json", JSON.stringify(db), (err)=> {console.log(err||"success");
    res.json('ok')})
})


app.post('/api/notes', (req,res)=>{
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err)=> {console.log(err||"success");
    res.json('ok')})
})

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, ()=> console.log('server is up on port ', PORT))



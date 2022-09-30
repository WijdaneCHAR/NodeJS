const express = require("express")
const mysql = require("mysql")

const app = express()

const port = 8080

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'newdb',
    port     : '3306'
})
app.use(express.json())

app.get('/users',(req,res)=>{
    const query = 'SELECT * FROM users'

    connection.query(query,(err,data)=>{
        err ? res.json({ msg : "Error"}) : res.json(data)
    })
})

app.post('/users',(req,res)=>{
   const { nameUser } = req.body;
   const query = 'INSERT INTO users(nameUser) VALUES(?)' 
   connection.query(query,nameUser,(err,data)=>{
    const getObj = ()=>{
        const newQuery = 'SELECT * FROM users WHERE idUser = ?'
        connection.query(newQuery,data.insertId,(err,data)=>{
            err ? res.json({msg:"Error"}) : res.json(data)
        })
    }
    err ? res.json({ msg : "Error"}) : getObj()
   })
})

app.listen(port,()=>{
    console.log("Running")
})
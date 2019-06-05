//load our app using express
const express = require('express')
const app = express()
const mysql = require('mysql')

// used to analyse the request 
const morgan = require('morgan')
//app.use(morgan('short'))
app.use(morgan('combined'))

app.get("/", (req, res) => {
    console.log("responding to root route")
    res.send("Hello from root...")
})

app.get("/users", (req, res) => {
    var users1 = { firstname: "Joyal", Lastname: "Gnanadurai" }
    var users2 = { firstname: "Jerin", Lastname: "Joyal" }
    res.json([users1, users2])
})

app.get("/user/:id", (req, res) => {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: ''
    })

    const userId = req.params.id
    const queryString = "select * from users where id=?"
    conn.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("error occured : " + err)
            res.sendStatus(500)
            //throw err
            res.end()
            return
        }

        const users = rows.map((row)=>{
            return {firstName:row.firstName, lastName:row.last_name}
        })
        res.json(rows)
    })
    // res.end()
})


app.listen(3003, () => {
    console.log('server is up and listening 3003')
})
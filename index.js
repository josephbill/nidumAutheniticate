const express = require("express"); //requiring express
const app = express(); //using express in app
const mysql = require("mysql") //requiring mysql lib
const generateAccessToken = require("./config/generateAccessToken") //jwt
const cors  = require('cors');
require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT


const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

db.getConnection( (err, connection)=> {
    if (err) throw (err)
    console.log ("DB connected successful: " + connection.threadId)
});
app.use(express.json());


//LOGIN (AUTHENTICATE USER, and return accessToken)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post("/login", (req, res) => {
    const user = req.body.email
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from wp_users where user_email = ?";
        const search_query = mysql.format(sqlSearch,[user]);
        await connection.query (search_query, async (err, result) => {
            connection.release()

            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.json({
                    msg: "The user credentials do not exist",
                })
                res.sendStatus(404)
            }
            else {
                //with email selected wait for the password from the result
                const hashedPassword = result[0].user_pass
                console.log(hashedPassword + " " + password);
                if (password === hashedPassword){
                    console.log("---------> Login Successful")
                    // console.log("---------> Generating accessToken")
                    // const token = generateAccessToken({user: user})
                    // console.log(token)
                    // res.json({accessToken: token})
                    //return
                    res.json({
                        status: "success",
                        result
                    })
                    res.sendStatus(200);
                } else {
                    //res.send("Password incorrect!")
                    res.json({
                        msg: "Password Incorrect!"
                    })
                }
       }//end of User exists
     }) //end of connection.query()
    }) //end of db.connection()
 }) //end of app.post()
//test these connections with the cmd : nodemon config/dbServer.js



const port = process.env.PORT
app.listen(
    port, ()=> console.log(`Server Started on port ${port}...`)
)








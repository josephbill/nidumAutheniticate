const express = require("express"); //requiring express
const app = express(); //using express in app
require("dotenv").config()
//requiring functionality classes.
const auth = require('./Authentication/login');  //authentication
const moduleClass = require('./Modules/modules'); //for modules
const userroles = require('./Authentication/roles'); //getting users role
app.use(express.json());


//LOGIN (AUTHENTICATE USER, and return accessToken ,get user role)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post("/login", (req, res) => {
       auth.loginUser(req,res);
 }) //end of app.post()
//test these connections with the cmd : nodemon config/dbServer.js

//get users role
app.post("/userrole",(req,res) => {
    userroles.getUsersRole(req,res);
})

///////////////////////////////////////////////////////////////////////////////////////
//MODULES (get modules based off user id)

//get modules
app.post("/modules", (req, res) => {
    moduleClass.modulesForUser(req,res);
}) //end of app.post()
//test these connections with the cmd : nodemon config/dbServer.js








const port = process.env.PORT
app.listen(
    port, ()=> console.log(`Server Started on port ${port}...`)
)








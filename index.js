const express = require("express"); //requiring express
const app = express(); //using express in app
require("dotenv").config()
//requiring functionality classes.
const auth = require('./Authentication/login');  //authentication
const moduleClass = require('./Modules/modules'); //for modules
const userroles = require('./Authentication/roles'); //getting users role
const userprofile = require('./Authentication/userprofile'); //getting users profile
const companies = require('./Company/usersCompany'); //get company stuff
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

//get users profile
app.post("/userprofile",(req,res) => {
    userprofile.getUsersProfile(req,res);
})

//get users first name
app.post("/userfirstname",(req,res) => {
    userroles.getUserFirstName(req,res);
})
//get users last name
app.post("/userlastname",(req,res) => {
    userroles.getUserLastName(req,res);
})


//////////////////////////////////////////////////////////////////////
//COMPANY INFO
//get users company based off users id
app.post("/usersCompany",(req,res)=> {
    companies.getUsersCompany(req,res);
})
//get company members based off company name , //this api returns the users id //once you have this ids, you can get user info from the user profile
//api
app.post("/companymembers",(req,res) => {
    companies.getCompanyMembers(req,res);
})

//get companies docs based off owners id
app.post("/companydocs",(req,res)=> {
    companies.getCompanyDocs(req,res);
})
//get companies docs based off company name
app.post("/companynamedocs",(req,res)=> {
    companies.getCompanyDocsBasedonName(req,res);
})


//get companies onboarding documents
app.post("/companyonboardingdocs",(req,res) => {
    companies.getOnboardingDocuments(req,res);
})


///////////////////////////////////////////////////////////////////////////////////////
//MODULES

//get modules based off owners user id
app.post("/modules", (req, res) => {
    moduleClass.modulesForUser(req,res);
}) //end of app.post()

//get modules based off company name
app.post("/modulesCompany", (req, res) => {
    moduleClass.modulesForCompany(req,res);
}) //end of app.post()
//test these connections with the cmd : nodemon config/dbServer.js

const port = process.env.PORT
app.listen(
    port, ()=> console.log(`Server Started on port ${port}...`)
)








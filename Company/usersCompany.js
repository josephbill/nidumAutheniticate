const mysql = require("mysql");
const configurationVars = require("../configuration/constants")
const {use} = require("bcrypt/promises");
//get company for user based off user id
function getUsersCompany(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const userId = req.body.userId;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLUSERCOMPANY;
        const search_query = mysql.format(sqlSearch,[userId]);
        await connection.query(search_query, async (err,result) => {
            connection.release();
            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.json({
                    msg: "The user credentials do not exist",
                })
                res.sendStatus(404)
            } else {
                console.log("Company for user found")
                //return
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }
        }) //end of connection query
    }) //end of db.getconnection
}

function getCompanyMembers(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const ownerCompany = req.body.companyname;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLCOMPANYMEMBERS;
        const search_query = mysql.format(sqlSearch,[ownerCompany]);
        await connection.query(search_query, async (err,result) => {
            connection.release();
            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> Company does not exist")
                res.json({
                    msg: "The company name does not exist",
                })
                res.sendStatus(404)
            } else {
                console.log("Company for user found")
                //return
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }
        }) //end of connection query
    }) //end of db.getconnection

}


//get company docs based off owners user id
function getCompanyDocs(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const user_id = req.body.userId;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLCOMPANYDOCS;
        const search_query = mysql.format(sqlSearch,[user_id]);
        await connection.query(search_query, async (err,result) => {
            connection.release();
            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> Company does not exist")
                res.json({
                    msg: "The company name does not exist",
                })
                res.sendStatus(404)
            } else {
                console.log("Documents for company found")
                //return
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }
        }) //end of connection query
    }) //end of db.getconnection

}

//get company docs based off owners user id
function getCompanyDocsBasedonName(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const companyname = req.body.companynames;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLCOMPANYDOCSNAME;
        const search_query = mysql.format(sqlSearch,[companyname]);
        await connection.query(search_query, async (err,result) => {
            connection.release();
            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> Company does not exist")
                res.json({
                    msg: "The company name does not exist",
                })
                res.sendStatus(404)
            } else {
                console.log("Documents for company found")
                //return
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }
        }) //end of connection query
    }) //end of db.getconnection

}

//get company onboarding docs based off company name
function getOnboardingDocuments(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const companyname = req.body.companynames;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLCOMPANYONBOARDINGDOCS;
        const search_query = mysql.format(sqlSearch,[companyname]);
        await connection.query(search_query, async (err,result) => {
            connection.release();
            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> Company does not exist")
                res.json({
                    msg: "The company name does not exist",
                })
                res.sendStatus(404)
            } else {
                console.log("Onboarding Documents for company found")
                //return
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }
        }) //end of connection query
    }) //end of db.getconnection

}

module.exports = { getUsersCompany, getCompanyMembers , getCompanyDocs , getCompanyDocsBasedonName , getOnboardingDocuments}
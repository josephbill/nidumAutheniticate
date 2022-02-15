const bcrypt = require("bcrypt");
const md5 = require("md5");
const mysql = require("mysql");
const configurationVars = require("../configuration/constants")

function getUsersRole(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const userId = req.body.userId;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLROLE;
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
                console.log("Role for user found")
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
//this gets users first and last name from meta table
function getUserFirstName(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const userId = req.body.userId;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLFIRSTNAME;
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
                console.log("First name for user found")
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


//this gets users first and last name from meta table
function getUserLastName(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const userId = req.body.userId;
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        const sqlSearch = process.env.SQLLASTNAME;
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
                console.log("Last name for user found")
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

module.exports = {getUsersRole , getUserLastName, getUserFirstName}
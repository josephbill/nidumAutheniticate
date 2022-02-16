const bcrypt = require("bcrypt");
const md5 = require("md5");
const mysql = require("mysql");
const configurationVars = require("../configuration/constants")
function loginUser(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

        const user = req.body.email
        const password = req.body.password
        //hashing password
        bcrypt.hash(password,10,(err,hash) => {
            console.log("hashed password is " + hash);
        })
        console.log("md5 password " + md5(password));
        configurationVars.db.getConnection ( async (err, connection)=> {
            if (err) throw (err)
            const sqlSearch = process.env.SQLLOGIN;
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
}

function forgotPassword(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const email = req.body.email
    const newpassword = req.body.newpassword
    configurationVars.db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        //getting all users to confirm email
        const sqlSearch = process.env.SQLUPDATEPASSWORD;
        //checking email
        const search_query = mysql.format(sqlSearch,[newpassword,email]);
        await connection.query (search_query, async (err, result) => {
            connection.release()
            if (err) throw (err)
            if (result.affectedRows == 0){
                console.log("--------> User does not exist")
                res.json({
                    msg: "The user credentials do not exist",
                })
                res.sendStatus(404)
            } else {
                if (result.changedRows == 0) {
                    console.log("......Password detected to be old password , no edit happened")
                    res.json({
                        msg: "No password edit , detected use old password to login"
                    })
                } else {
                    console.log("Password updated");
                    res.json({
                        status: "success",
                        msg: "Password updated , successfully",
                        result
                    })
                    res.sendStatus(200);
                }

                    }
                })
    }) //end of db.connection()
}

function deleteUser(req,res){

    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const user_id = req.body.userId
    configurationVars.db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        //delete
        const sqlSearch = process.env.SQLDELETEUSER;
        const search_query = mysql.format(sqlSearch,[user_id]);
        await connection.query (search_query, async (err, result) => {
            connection.release()
            if (err) throw (err)
            if (result.affectedRows == 0){
                console.log("--------> User does not exist")
                res.json({
                    msg: "The user credentials do not exist",
                })
                res.sendStatus(404)
            } else {


                    res.json({
                        status: "success",
                        msg: "User deleted, successfully",
                        result
                    })
                    res.sendStatus(200);
                }


        })
        deletefromUserMeta(user_id)
    }) //end of db.connection()

}

function deletefromUserMeta(user_id){
    console.log("user id is " + user_id)
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });
    configurationVars.db.getConnection(async (err,connection) => {
        if (err) throw (err)
        //delete user from meta
        const sqlsearch = process.env.SQLDELETEUSERMETA;
        const delete_query = mysql.format(sqlsearch,[user_id])
        await connection.query(delete_query,async (err,result) => {
            connection.release()
            if (err) throw (err)
            if (result.affectedRows == 0){
                console.log("No user meta data found")
            } else {
                console.log("Data in meta data table deleted")
            }
        })
    })


}

module.exports = { loginUser , forgotPassword , deleteUser }
























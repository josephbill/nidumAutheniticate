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
}

module.exports = { loginUser }
//this function gets all modules
const mysql = require("mysql");
const configurationVars = require("../configuration/constants")
function modulesForUser(req,res){
    //testing db connection
    configurationVars.db.getConnection( (err, connection)=> {
        if (err) throw (err)
        console.log ("DB connected successful: " + connection.threadId)
    });

    const user_id = req.body.user_Id;
    configurationVars.db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = process.env.SQLMODULES;
        const moduleSearch = mysql.format(sqlSearch,[user_id]);
        await connection.query (moduleSearch, async (err, result) => {
            connection.release()

            if (err) throw (err)
            if (result.length == 0) {
                console.log("--------> No modules exist for this user")
                res.json({
                    msg: "No modules exist for this user",
                })
                res.sendStatus(404)
            }
            else {
                console.log("modules found")
                res.json({
                    status: "success",
                    result
                })
                res.sendStatus(200);
            }//end of Module exists
        }) //end of connection.query()
    }) //end of db.connection()
}

module.exports = {modulesForUser}
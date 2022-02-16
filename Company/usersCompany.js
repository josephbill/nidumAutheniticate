const mysql = require("mysql");
const configurationVars = require("../configuration/constants")
const {use} = require("bcrypt/promises");
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require("fs");
let upload = multer({ dest: './uploads/'});



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

function postCompanyDocument(req,res){

    /** When using the "single"
     data come in "req.file" regardless of the attribute "name". **/
    let tmp_path = req.file.path;



    /** The original name of the uploaded file
     stored in the variable "originalname". **/
    let target_path = 'uploads/' + req.file.originalname;
    let user_id = req.body.userId;
    let document_url = req.file.originalname;
    let document_name = req.body.documentName;
    let company_name = req.body.companyName;
    let document_category = req.body.docCat;
    let digitized = req.body.digitized; //u can add a default as no.
    /** A better way to copy the uploaded file. **/
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { console.log("File Moved Successfully") });
    src.on('error', function(err) {console.log("Error " + err.message) });

    if (!tmp_path) {
        return res.status(400).send({ message: 'Please upload a file.' });
    } else {
        let sql = "INSERT INTO wp_submitted_company_docs(`user_id`,`document_url`,`document_name`,`company_name`,`document_category`,`digitized`) VALUES ('"+user_id+"','" +target_path+ "','"+document_url+"','"+company_name+"','"+document_category+"','"+digitized+"')";
        configurationVars.db.query(sql, function(err, result) {
            if (err) throw (err)
            return res.send({ message: 'File inserted successfully.',result, document_url });
        });

    }

}

module.exports = { getUsersCompany, getCompanyMembers , getCompanyDocs , getCompanyDocsBasedonName , getOnboardingDocuments, postCompanyDocument}
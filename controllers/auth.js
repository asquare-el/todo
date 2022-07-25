const pool  = require('../db');
const express = require('express')
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.reg = async(req,res) => {
    const {username, password, email_id} = req.body
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)
        let resp = await pool.query(`insert into users(username, password,email_id) values('${username}','${hashedPassword}','${email_id}')`)
        res.status(200).send({username,password,email_id})

    }
    catch(err)
    {
        res.status(500).send(err)
    }
}


module.exports.login = async(req,res) => {
    
    const { password, email_id } = req.body
    
    const cred = await pool.query(`select * from users where email_id='${email_id}'`);

    
    if(cred.rows.length==0)
    {
       return res.status(400).send('user not found')
    }

    try{
         
        if (await bcrypt.compare(password, cred.rows[0].password))
        {
            let userID= await pool.query(`select userid from users where email_id='${email_id}'`)
            console.log(userID)
            let storeuserID = await pool.query(`insert into sessiondetail(userid) values ('${userID.rows[0].userid}')`);
            let sessionid= await pool.query(`select session_id from sessiondetail where userid='${userID.rows[0].userid}'`)
            console.log(sessionid)
            const user_cred= { id: cred.rows[0].userid, sessionID : sessionid.rows[0].session_id} 

            const accessToken = jwt.sign(user_cred, process.env.ACCESS_TOKEN, {expiresIn: "15m"})
            res.json({ accessToken: accessToken })
            
        }
        else{
            res.send('incorrect password given')
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send(err)
    }
}


module.exports.logout = async(req,res) => {
    try{
        let d=new Date();
        let date=d.getDate();
        let month=d.getMonth();
        let year=d.getFullYear();
        let hours=d.getHours();
        let min=d.getMinutes();
        let secs=d.getSeconds();
        
        let curdate=year+"-"+month+"-"+date+" "+hours+":"+min+":"+secs;

        let endtime_val= await pool.query('update sessionDetail set endtime=$1 where session_id=$2',[curdate,req.user_cred.sessionID] )
        res.send('logged out seccessfully')
  

    }
    catch(err)
    {
        res.send('cannot logout, check again.')
        console.log(err)
    }
}



//middleware


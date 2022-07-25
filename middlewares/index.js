const jwt = require('jsonwebtoken')
const pool  = require('../db');


function authenticateToken(req,res, next)
{
    const authHeader = req.headers['autherization']
    // const token = authHeader && authHeader.split(' ')[1]
    console.log(authHeader)
    if(authHeader== null) return res.status(401).send('login first')

    jwt.verify(authHeader, process.env.ACCESS_TOKEN, async (err,user) =>
    {
        if(err) return res.status(403).send('access had been denied')
        req.user=user
        console.log(req.user)
        let isInvalidToken= await pool.query(`select endtime from sessiondetail where session_id='${req.user.sessionID}'`)
        if(isInvalidToken.rows[0].endtime!=null)
        {return res.send("session has expired. please login again")
    }

        next()
    
    })
}


module.exports = authenticateToken
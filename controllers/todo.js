const { query } = require('express');
const pool  = require('../db');

module.exports.index = async(req,res)=>{

    try{

        const {userid}= req.user.id;
        const todos = await pool.query('select * from todo where userid =$1 and deleted is not null',[userid]);

        res.send(todos.rows);
 
    }

    catch(err){

        console.log(err.message);
    }

}

module.exports.getTodo=async(req,res)=>{

    try{

        let {offset=0, limit=5} = req.query

        const userid=req.user.id;
        console.log('sssd')
        console.log(userid)

        const todo=await pool.query('select count(*) from todo where userid=$1',[userid]);
        const search=await pool.query(`select * from todo where userid=${userid} limit ${limit} offset ${offset}`);
        let display={'total_count' : Number(todo.rows[0].count),
                    'data_Display' : search.rows}

        res.send(display);
    }

    catch(err){

        console.log(err.message);
    }
}

module.exports.createTodo=async(req,res)=>{

    const{task_description,deadline}=req.body;
    const userid =req.user.id

    // const userid = user.id

    try{
        
        const todo = await pool.query('insert into todo (task_description, deadline, userid)  values($1,$2,$3) ',[task_description,deadline,userid]);

        res.send(todo.rows);
    }

    catch(err){

        console.log(err.message);
    }
   
}

module.exports.updateTodo = async(req,res)=>{

    const{id} = req.params;
    const{task_description,status,userid} = req.body;

    try{

        const updatedTodo = await pool.query('update todo set task_description=$1,status=$2 where userid=$3',[task_description,status,userid]);
        
        res.send(updatedTodo);
    }

    catch(err){

        console.log(err.message);
    }
}

module.exports.removeTodo = async(req,res)=>{

    try{
        
        const{id} = req.params;
        const{userid}=req.body;
        const deleteTodo = await pool.query('update todo set priority=null where userid=$1',[userid]);

        res.send("todo is deleted");
    }

    catch(err){

        console.log(err.message);
    }
}

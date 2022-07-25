const express = require('express');
const app=express();

const todoRoutes=require('./routes/todo');
const userRoutes=require('./routes/auth')

app.use(express.json());


app.use('/todo',todoRoutes);
app.use('/user',userRoutes)


app.listen(8080,()=>{

    console.log("listening on port no 3000!");
})
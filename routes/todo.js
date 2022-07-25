const express = require('express');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const  router  = express.Router();
const todo = require('../controllers/todo');

const authenticateToken = require('../middlewares/index');

router.use('/', authenticateToken)

router.get('/index',todo.index);

router.get('/:id',todo.getTodo);

router.post('/new',todo.createTodo);

router.put('/:id/update',todo.updateTodo);

router.delete('/:id',todo.removeTodo);

module.exports=router;
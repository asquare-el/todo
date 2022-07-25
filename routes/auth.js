const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const authenticateToken = require('../middlewares/index')

router.post('/reg', auth.reg)

router.post('/login',auth.login)
router.post('/logout',authenticateToken,auth.logout)

module.exports = router

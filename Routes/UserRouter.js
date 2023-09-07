const express =require('express');
const router = express.Router();

const {userRegister,userLogin,sendOtp} = require('../Controllers/UserController');




router.post('/register',userRegister );
router.post('/login',userLogin );
router.post('/sendOtp',sendOtp );

module.exports = router;
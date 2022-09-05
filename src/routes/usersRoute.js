let express = require('express');
let router = express.Router();
let userController = require('../controllers/usersController.js');
// let multer = require('multer');
let path = require('path');
const db = require('../database/models');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');

router.get('/users/login',guest, userController.login);
// router.get('/register/:email', userController.askRegister);
// router.get('/register',guest, userController.register);
// router.get('/edit/:id',auth, userController.edit);
// router.get('/profile',auth,userController.profile);
// router.get('/logout', userController.logout);
// router.post('/login', validateUserLogin, userController.loginProcess);
// router.post('/register', uploadFile.single('image'), validateUserRegister, userController.registerWrite);
// router.put('/update/:id',auth, uploadFile.single('image'), validateUserUpdate, userController.update);
// router.get('*', userController.notFound);


module.exports = router;
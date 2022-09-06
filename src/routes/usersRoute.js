let express = require('express');
let router = express.Router();
let userController = require('../controllers/usersController.js');
// let multer = require('multer');
let path = require('path');
const db = require('../database/models');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const {body} = require('express-validator');

const validateUserRegister = [
    body('name').notEmpty().withMessage('Por favor ingrese un nombre de usuario'),
    body('name').custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        db.User.findOne({where:{name:req.body.name}}).then(function(user){
          
          if(Boolean(user)) {
            reject(new Error('El usuario ya estgá siendo usado por otra persona, por favor elegí uno distinto.'))
          }
          resolve(true)
        }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
      });
    }), 
      body('email').isEmail().withMessage('Por favor ingresa un email valido'),
      body('email').custom((value, {req}) => {
          return new Promise((resolve, reject) => {
            db.User.findOne({where:{email:req.body.email}}).then(function( user){
              
              if(Boolean(user)) {
                reject(new Error('Ese email ya está registrado'))
              }
              resolve(true)
            }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
          });
        }), 
      body('password').notEmpty().withMessage('Por favor ingrese una contraseña'),
      body('password').isLength({min:8}).withMessage('Tu contraseña debe al menos tener 8 caracteres')
  ];

router.get('/users/login',guest, userController.login);
//router.get('/register/:email', userController.askRegister);
router.get('/users/register',guest, userController.register);
// router.get('/edit/:id',auth, userController.edit);
// router.get('/profile',auth,userController.profile);
// router.get('/logout', userController.logout);
// router.post('/login', validateUserLogin, userController.loginProcess);
router.post('/register', validateUserRegister, userController.registerWrite);
// router.put('/update/:id',auth, uploadFile.single('image'), validateUserUpdate, userController.update);
// router.get('*', userController.notFound);


module.exports = router;
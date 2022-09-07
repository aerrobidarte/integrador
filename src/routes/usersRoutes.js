let express = require('express');
let router = express.Router();
let userController = require('../controllers/usersController.js');
// let multer = require('multer');
let path = require('path');
const db = require('../database/models');
const guest = require('../middlewares/guest');
const auth = require('../middlewares/auth');
const {body} = require('express-validator');

const validateUserLogin = [
  body('email').notEmpty().withMessage('Por favor ingresa el email con el que te registraste'),
  body('email').isEmail().withMessage('Por favor ingresa un email valido'),
]
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
    body('remember').notEmpty().withMessage('Por favor pon una palabra o frase para recordar tu password'),
    body('remember').custom((value, {req})=>{
      if (value == req.body.password){
        throw new Error('Esto NO puede ser igual a tu contraseña!');
      }
      return true;
    }),
    body('password').notEmpty().withMessage('Por favor ingrese una contraseña'),
    body('password').isLength({min:8}).withMessage('Tu contraseña debe al menos tener 8 caracteres')
  ];

router.get('/users/login',guest, userController.login);
//router.get('/register/:email', userController.askRegister);
router.get('/users/register',guest, userController.register);
// router.get('/edit/:id',auth, userController.edit);
router.get('/users/profile',auth,userController.profile);
router.get('/users/logout', userController.logout);
router.post('/users/login', validateUserLogin, userController.loginProcess);
router.post('/users/register', validateUserRegister, userController.registerWrite);
// router.put('/update/:id',auth, uploadFile.single('image'), validateUserUpdate, userController.update);
// router.get('*', userController.notFound);


module.exports = router;
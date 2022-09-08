const express = require('express');
const router = express.Router();
const db = require('../database/models');
const moviesController = require('../controllers/moviesController');
const admin = require('../middlewares/admin');
const {body} = require('express-validator');


const validateMovie = [
    body('title').notEmpty().withMessage('Por favor ingrese un titulo'),
    body('title').custom((value, {req}) => {
      return new Promise((resolve, reject) => {
        db.Movie.findOne({where:{title:req.body.title}}).then(function(movie){
          
          if(Boolean(movie)) {
            reject(new Error('El titulo ya esta registrado'))
          }
          resolve(true)
        }).catch(err => {console.log(err); reject(new Error('Error en el servidor'))});
      });
    }), 
    body('rating').notEmpty().withMessage('Por favor ingrese un rating'),
    body('rating').isNumeric().withMessage('Por favor ingresar un valor numerico'),

    body('length').notEmpty().withMessage('Por favor ingrese una duracion'),
    body('length').isNumeric().withMessage('Por favor ingresar un valor numerico'),

    body('awards').notEmpty().withMessage('Por favor ingrese un numero de premios'),
    body('awards').isNumeric().withMessage('Por favor ingresar un valor numerico'),

    body('release_date').notEmpty().withMessage('Por favor ingrese una fecha'),
    // body('awards').isDate isNumeric().withMessage('Por favor ingresar un valor numerico'),
    
    body('genre_id').notEmpty().withMessage('Por favor ingrese un genero'),
  ];

router.get('/movies/detail/:id', moviesController.detail);
router.get('/movies/add',admin, moviesController.add);
router.post('/movies/create',admin,validateMovie, moviesController.create);
router.get('/movies/edit/:id',admin, moviesController.edit);
router.put('/movies/update/:id',admin,validateMovie, moviesController.update);
router.get('/movies/delete/:id',admin, moviesController.delete);
router.delete('/movies/delete/:id',admin, moviesController.destroy);

module.exports = router;
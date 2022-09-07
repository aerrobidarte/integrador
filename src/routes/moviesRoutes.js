const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const admin = require('../middlewares/admin');

router.get('/movies/detail/:id', moviesController.detail);
router.get('/movies/add',admin, moviesController.add);
router.post('/movies/create', moviesController.create);
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id', moviesController.update);
router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', moviesController.destroy);

module.exports = router;
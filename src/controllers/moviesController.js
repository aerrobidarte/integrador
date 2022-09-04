const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, Association } = require("sequelize");

const moviesController = {
    detail: function (req, res) {
        db.Movie.findByPk(req.params.id,{include:[{association:"generos"},{association:"actores"}]})
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    add: function(req,res){
        db.Genre.findAll()
            .then(allGenres => {
                res.render('moviesAdd', {allGenres:allGenres})
            })
    },
    create: function(req,res){
        db.Movie.create({
            title:req.body.title,
            rating:req.body.rating,
            length:req.body.length,
            awards:req.body.awards,
            release_date:req.body.release_date,
            genre_id:req.body.genre_id,
        })
            .then(
                res.redirect("/home")
            )
    },
    edit: function(req,res) {
        let pedidosPelicula=db.Movie.findByPk(req.params.id);
        let pedidosGeneros=db.Genre.findAll();
        Promise.all([pedidosPelicula,pedidosGeneros])
            .then(function([Movie,allGenres]){
                res.render('moviesEdit', {Movie:Movie,allGenres:allGenres})
            })

    },
    update: function (req,res) {
        db.Movie.update({
            title:req.body.title,
            rating:req.body.rating,
            length:req.body.length,
            awards:req.body.awards,
            release_date:req.body.release_date,
        },{
            where: {
                id:req.params.id
            }
        })
            .then( 
                res.redirect("/home")
            );
    },
    delete: function (req,res) {
        db.Movie.findByPk(req.params.id)
            .then(function(Movie){
                res.render("moviesDelete",{Movie:Movie})
            })
    },
    destroy: function (req,res) {
        db.Movie.destroy({
            where:{
                id:req.params.id
            }
        })
            .then(
                res.redirect("/movies")
            )
    }

}

module.exports = moviesController;
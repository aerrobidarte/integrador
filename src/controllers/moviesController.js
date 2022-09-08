const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");
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
        let errores = validationResult(req);
        if (errores.errors.length > 0) {
            db.Genre.findAll()
                .then(allGenres => {
                    res.render('moviesAdd', {allGenres:allGenres,errors:errores.mapped(),oldData:req.body})

                })
            // res.render("moviesAdd", {
            //   errors: errores.mapped(),
            //   oldData: req.body,
            // });
        } else {
            db.Movie.create({
                title:req.body.title,
                rating:req.body.rating,
                length:req.body.length,
                awards:req.body.awards,
                release_date:req.body.release_date,
                genre_id:req.body.genre_id,
            })
                .then(
                    res.redirect("/")
                )
        }
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
            genre_id:req.body.genre_id,
            release_date:req.body.release_date,
        },{
            where: {
                id:req.params.id
            }
        })
            .then( 
                res.redirect("/")
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
                res.redirect("/")
            )
    }

}

module.exports = moviesController;
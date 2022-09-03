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
    }
}

module.exports = moviesController;
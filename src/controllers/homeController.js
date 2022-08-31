const path=require('path');
const db=require('../database/models');
const sequelize=db.sequelize;
const { Op } = require("sequelize");

const homeController={
    index:function(req,res){
        console.log('Llego');
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies:movies})
            })
    }
}
module.exports=homeController;
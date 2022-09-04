module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'movies',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        timestamps: true,
    };
    const Movie = sequelize.define(alias, cols, config)

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,{
            as:"generos",
            foreignKey: "genre_id"
        }); 

        Movie.belongsToMany(models.Actor,{
            as:'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id',
            timestamps: false
        })
    }
    return Movie
}
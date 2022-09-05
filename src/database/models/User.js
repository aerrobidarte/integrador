module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        remember_token:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        created_at:{
            type:dataTypes.DATEONLY,
        },
        updated_at:{
            type:dataTypes.DATEONLY,
        },
        rol:{
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        // createdAt: 'createdAt',
        // updatedAt: 'updatedAt',
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config); 

    return User;
}
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        login: {type:DataTypes.STRING,unique: 'compositeIndex'},
        password: DataTypes.STRING,
        isadmin : DataTypes.BOOLEAN

    });

    User.associate = function(models) {
        //les has many
        User.hasMany(models.Historique);
        User.hasMany(models.Remboursement);

    }



    return User;
};
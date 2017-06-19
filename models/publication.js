"use strict";

module.exports = function(sequelize, DataTypes) {
    var Publication = sequelize.define("Publication", {
        titre: DataTypes.STRING,
        prix: DataTypes.DOUBLE,
        photo: DataTypes.STRING,
        nbnum : DataTypes.INTEGER,
        description : DataTypes.TEXT
    });

    Publication.associate = function(models) {
        //les has many
        Publication.hasMany(models.Abonnement);

    }

    return Publication;
};
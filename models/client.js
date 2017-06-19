"use strict";

module.exports = function(sequelize, DataTypes) {
    var Client = sequelize.define("Client", {
        nom : DataTypes.STRING,
        prenom : DataTypes.STRING,
        email  : DataTypes.STRING,
        password : DataTypes.STRING,
        datenaissance : DataTypes.DATE,
        lieunaissance : DataTypes.STRING,
        adresse1 : DataTypes.STRING,
        adresse2 : DataTypes.STRING,
        codepostale : DataTypes.INTEGER,
        ville : DataTypes.STRING,
        tel : DataTypes.INTEGER,
        remember : DataTypes.BOOLEAN
    });

    Client.associate = function(models) {
        //les has many
        Client.hasMany(models.Abonnement);
        Client.hasMany(models.Historique);

    }


    return Client;
};
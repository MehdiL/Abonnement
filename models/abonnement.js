"use strict";

module.exports = function(sequelize, DataTypes) {
    var Abonnement = sequelize.define("Abonnement", {
        debut : DataTypes.DATE,
        actif : DataTypes.BOOLEAN,
        dernierdebut : DataTypes.DATE
    });

    Abonnement.associate = function(models) {
        //les has many
        Abonnement.hasOne(models.Paiement);


    }


    return Abonnement;
};
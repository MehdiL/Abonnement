"use strict";

module.exports = function(sequelize, DataTypes) {
    var Paiement = sequelize.define("Paiement", {
        prix : DataTypes.DOUBLE,
        transaction : DataTypes.STRING
    });

    Paiement.associate = function(models) {
        //les has many
        Paiement.hasOne(models.Remboursement);

    }


    return Paiement;
};
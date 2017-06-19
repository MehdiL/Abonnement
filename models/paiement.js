"use strict";

module.exports = function(sequelize, DataTypes) {
    var Paiement = sequelize.define("Paiement", {
        prix : DataTypes.DOUBLE,
        transaction : DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                //les has many
            }
        }
    });

    return Paiement;
};
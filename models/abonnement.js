"use strict";

module.exports = function(sequelize, DataTypes) {
    var Abonnement = sequelize.define("Abonnement", {
        debut : DataTypes.DATE,
        actif : DataTypes.BOOLEAN,
        dernierdebut : DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                //les has many
            }
        }
    });

    return Abonnement;
};
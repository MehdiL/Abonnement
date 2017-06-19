"use strict";

module.exports = function(sequelize, DataTypes) {
    var Historique = sequelize.define("Historique", {
        date_historique : DataTypes.DATE,
        type : DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                //les has many
            }
        }
    });

    return Historique;
};
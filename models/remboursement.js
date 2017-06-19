"use strict";

module.exports = function(sequelize, DataTypes) {
    var Remboursement = sequelize.define("Remboursement", {
        transaction : DataTypes.STRING,
        date_remboursement : DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                //les has many
            }
        }
    });

    return Remboursement;
};
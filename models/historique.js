"use strict";

module.exports = function(sequelize, DataTypes) {
    var Historique = sequelize.define("Historique", {
        date_historique : DataTypes.DATE,
        type : DataTypes.INTEGER
    });



    return Historique;
};
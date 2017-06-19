var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var models = require('../models');

module.exports = function (passport,user) {


    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });
    passport.deserializeUser(function(id, done) {

        user.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

    passport.use('local-login', new LocalStrategy({
            // champs du formulaire login
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, login, password, done) {
            var result = undefined;
            // console.log(password+"pass");
            var isValidPassword = function(userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }
            if(password===""){
                return done(null, false);
            }
            user.findOne({
                where : {
                    login : login
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: "Ce login n'existe pas."
                        }
                     );
                }
                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Mot de passe incorrect.'
                    });

                }

                var userinfo = user.get();
                return done(null, userinfo);
            });

        }));

};

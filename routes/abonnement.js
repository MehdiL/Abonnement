var express = require('express');
var router = express.Router();

router.get('/abonnements',isLoggedIn,function (req,res) {
    res.render('abonnements',{abonnements : abonnement.getAll()});
})

router.get('/abonnement/:id',isLoggedIn,function (req,res) {
    abonnement.findById(req.params.id).then(function (abonnement) {

        if(!abonnement){
            res.render('notfound');
        }
        res.render('abonnement',{abonnement : abonnement.get()});
    })
})

router.get('abonnements/client/:id',isLoggedIn,function (req,res) {
    abonnement.findAll({
        where :{
            ClientId : req.params.id
        }
    }).then(function (abonnements) {
        if(!abonnements){
            res.render('abonnementsClient',{message : "Aucun abonnement pour ce client"});
        }
        res.render('abonnementsClient',{abonnements : abonnements});
    })

})

router.get('abonnement/create',isLoggedIn,function (req,res) {

    res.render('creationAbonnement',{clients : client.getAll(),publications : publication.getAll()});
})

router.post('abonnement',isLoggedIn,function (res,req) {
    abonnement.findOne({
        where : {
            ClientId : req.body.ClientId,
            PublicationId : req.body.PublicationId
        }
    }).then(function (abonnement) {

        if(abonnement){
            res.redirect('abonnement/edit',{message : "Un abonnement existe déjà pour ce client et cette publication" , abonnement: abonnement})
        }

        var newabo = req.body;

        var abonnement = abonnement.build({
            debut : Date.now(),
            actif : truc,
            dernierdebu : Date.now(),
            ClientId : newabo.ClientId,
            PublicationId : newabo.PublicationId
        })
        abonnement.save().then(function (abonnement) {
            if(!abonnement){
                res.status(500).end();

            }
            res.render('/abonnement/'+abonnement.id,{message : "Abonnement créé."})
        })
    })

})
function isLoggedIn(req, res, next) {
    // si utilisateur authentifié, continuer
    if (req.isAuthenticated()) {
        return next();
    }
    // sinon erreur 'Unauthorized'
    res.status(401).end();
}


module.exports = router;
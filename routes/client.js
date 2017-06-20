var express = require('express');
var router = express.Router();


router.get('/clients',isLoggedIn,function (req,res) {
   res.render('clients',{clients :  client.getAll() });
});

router.get('client/:id',isLoggedIn,function (req,res) {

    client.findById(req.params.id).then(function (client) {
        if(!client){
            res.render('notfound');
        }

        res.render('client',{client : client.get()});
    });
});


router.put('/client/:id',isLoggedIn,function (req,res) {
    var clientedit = req.body
    client.findById(clientedit.id).then(function (client) {

        client.nom = clientedit.nom;
        client.prenom = clientedit.prenom;
        client.password =   bCrypt.hashSync(clientedit.password);
        client.datenaissance = clientedit.datenaissance;
        client.lieunaissance = clientedit.lieunaissance;
        client.adresse1 = clientedit.adresse1;
        client.adresse2 = clientedit.adresse2;
        client.codepostale = clientedit.codepostale;
        client.ville = clientedit.ville;
        client.tel = clientedit.tel;

        client.save().then(function (client) {
            res.status(200);
            res.redirect('client/'+client.id);
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

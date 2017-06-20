var express = require('express');
var router = express.Router();


//toutes les publication
router.get('/publication',isLoggedIn, function(req, res) {
    res.render('publications',{publications : publication.getAll()});
});

//un publication
router.get('/publication/:id',isLoggedIn, function(req, res) {
    user.findById(req.params.id).then(function (publication) {

        if(!publication){
            res.render('notfound');
        }else{

            res.render('publication',{publication : publication.get()});
        }

    })

});

//formulaire création publication
router.get('/publication/new',isLoggedIn,function (req,res) {

    res.render('publication_new');
})

//formulaire édition d'un publication
router.get('publication/edit/:id',isLoggedIn,function (req,res) {

        publication.findById(req.params.id).then(function (publication) {
            if(!publication){
                res.render('notfound');
            }else{
                res.render('publication_edit',{publication : publication.get()});
            }
        })
})
router.post('/publication',isLoggedIn,function (req,res) {
    var newpub  = req.body;

    if(req.files){
        var fichier = req.files.photo;
        var nomfinal = Date.now()+'_'+req.user.id;


        fichier.mv('public/images/'+nomfinal, function(err) {
            if(err)
                console.log(err);
            var publication = publication.build({
                titre : newpub.titre,
                description : newpub.description,
                nbnum : newpub.nbnum,
                prix : newpub.prix,
                photo : nomfinal
            })
            publication.save().then(function (publication) {
                res.status(200);
                res.redirect('publication/:'+publication.id)
            });

        });


    }
});

router.put('/publication',function (req,res,next) {
    var newpub  = req.body;
    publication.findById(req.body.id).then(function (publication) {
        if(req.files){
            var fichier = req.files.photo;
            var nomfinal = Date.now()+'_'+req.user.id;


            fichier.mv('public/images/'+nomfinal, function(err) {
                if(err)
                    console.log(err);

                publication.titre = newpub.titre;
                publication.description = newpub.description;
               publication.prix = newpub.prix;
               publication.nbnum = newpub.nbnum;
               publication.photo = nomfinal;
                publication.save().then(function (publication) {
                    res.status(200);
                    res.redirect('publication/'+publication.id)
                });

            });


        }else
        {


                publication.titre = newpub.titre;
                publication.description = newpub.description;
                publication.prix = newpub.prix;
                publication.nbnum = newpub.nbnum;
                publication.save().then(function (publication) {
                    res.status(200);
                    res.redirect('publication/:'+publication.id)
                });



        }
    })

});

function isLoggedIn(req, res, next) {
    // si utilisateur authentifié, continuer
    if (req.isAuthenticated()) {
        return next();
    }
    // sinon erreur 'Unauthorized'
    res.status(401).end();
}

module.exports = router;

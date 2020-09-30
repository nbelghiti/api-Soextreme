var express = require('express'),  
    session = require('express-session'),
    Employe = require('../models/employe-model'),
    app     = express(),
    router  = express.Router();



// Debut de la collections Employe 
router.route('/employe/add')  
    .get(function(req, res){
      Employe.find(function(err, employes){
        if(err){
          res.send(err);
        }
        else{res.send(employes)};
      });
    })
    .post(function(req, res){
      var employe = new Employe();
      employe.nom = req.body.nom;
      employe.prenom = req.body.prenom;
      employe.email = req.body.email;
      employe.password = req.body.password;
      employe.telephone = req.body.telephone;
      employe.departement = req.body.departement;
      employe.statut = req.body.statut;
      employe.nbre_heure = req.body.nbre_heure;
      employe.save(function(err){
        if(err){res.send(err);} 
		else { res.send({message : 'L"Employe est enregistré dans le SI'});}
      })
    });
router.route('/employe/login')
    .get(function (req,res){
			Employe.find(function(err, employes){
			if(err){res.send(err);}
			else{res.send(employes);}
		});
	})
	.post(function(req,res){
		var employe = new Employe();
		employe.email = req.body.email;
		employe.password = req.body.password;
		Employe.findOne({email: employe.email, password: employe.password},function(err,employes){
		if(err){res.send(err);}
		else{res.send(employes);}   
	});
});

router.route('/employe/:employe_id')  
  .get(function(req, res){
    Employe.findOne({_id: req.params.employe_id}, function(err, employe){
      if(err){res.send(err);} 
      else{res.send(employe);}
    });
  })
  .put(function(req, res){
    Employe.findOne({_id: req.params.employe_id}, function(err, employe){
      if(err){
        res.send(err);
      } else {
		  
		  employe.nom = req.body.nom;
      employe.prenom = req.body.prenom;
      employe.email = req.body.email;
      employe.password = req.body.password;
      employe.telephone = req.body.telephone;
      employe.departement = req.body.departement;
      employe.statut = req.body.statut;
      employe.nbre_heure = req.body.nbre_heure;		  
		  
	  }
      employe.save(function(err){
        if(err){res.send(err); }
        else{res.send({message: 'L"Employe est mis a jour dans le SI'})};
      });
    });
  })
  .delete(function(req, res){
    Employe.remove({_id: req.params.employe_id}, function(err){
      if(err){res.send(err);}
      else{res.send({message: 'Employe supprimé'})};
    });
  });
// Fin de la collections Client
	

  module.exports = router;
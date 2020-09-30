var express = require('express'),  
  Paiement = require('../models/paiement-model'),
  router = express.Router();

// Debut Collection Planing
router.route('/paiement/add')  
    .get(function(req, res){
      Paiement.find(function(err,pls){
        if(err){
          res.send(err);
        }
        else{res.send(pls);}
      });
    })
    .post(function(req, res){
      var pl = new Paiement();
      pl.somme= req.body.somme;
      pl.date_pmt = req.body.date_pmt;
      pl.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'Paiement enregistré'})};
      })
    });

router.route('/paiement/:paiement_id')  
  .get(function(req, res){
    Paiement.findOne({_id: req.params.paiement_id}, function(err, pl){
      if(err){
        res.send(err);
      }
      else{res.send(pl)};
    });
  })
  .put(function(req, res){
    Paiement.findOne({_id: req.params.paiement_id}, function(err, pl){
      if(err){
        res.send(err);
      } else {
		 		  
		  pl.somme= req.body.somme;
      pl.date_pmt = req.body.date_pmt;
		  
	  }
      pl.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Paiement modifié'});}
      });
    });
  })
  .delete(function(req, res){
    Paiement.remove({_id: req.params.paiement_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Paiement supprimé'});}
    });
  });
// Fin Collection Paiement


	

  module.exports = router;
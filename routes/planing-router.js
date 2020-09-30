var express = require('express'),  
  Planing = require('../models/planing-model'),
  router = express.Router();

// Debut Collection Planing
router.route('/planing/add')  
    .get(function(req, res){
      Planing.find(function(err,pls){
        if(err){
          res.send(err);
        }
        else{res.send(pls);}
      });
    })
    .post(function(req, res){
      var pl = new Planing();
      pl.date_plg= req.body.date_plg;
      pl.heure_in = req.body.heure_in;
      pl.heure_out = req.body.heure_out;
      pl.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'Planing enregistré'})};
      })
    });

router.route('/planing/:planing_id')  
  .get(function(req, res){
    Planing.findOne({_id: req.params.planing_id}, function(err, pl){
      if(err){
        res.send(err);
      }
      else{res.send(pl)};
    });
  })
  .put(function(req, res){
    Planing.findOne({_id: req.params.planing_id}, function(err, pl){
      if(err){
        res.send(err);
      } else {
		 		  
		  pl.date_plg= req.body.date_plg;
      pl.heure_in = req.body.heure_in;
      pl.heure_out = req.body.heure_out;
		  
	  }
      pl.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Planing modifié'});}
      });
    });
  })
  .delete(function(req, res){
    Planing.remove({_id: req.params.planing_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Planing supprimé'});}
    });
  });
// Fin Collection Planing


	

  module.exports = router;
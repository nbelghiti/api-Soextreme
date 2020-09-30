var express = require('express'),  
  Activite = require('../models/activites-model'),
  router = express.Router();

	// Debut Collection Activite
	
	router.route('/activite/add')  
		.get(function(req, res){
		  Activite.find(function(err,activites){
			if(err){
			  res.send(err);
			}
			res.send(activites);
		  });
		})
		.post(function(req, res){
			  var activite = new Activite();
			  activite.nbr_place 		= req.body.nbr_place;
			  activite.libelle 			= req.body.libelle;
			  activite.type_act 		= req.body.type_act;
			  activite.prix				= req.body.prix;
			  activite.description		= req.body.description;
			  activite.photo 			= req.body.photo;	 
			  activite.condition		= req.body.condition;
			  activite.visible			= req.body.visible;
			  activite.visible_home		= req.body.visible_home;
			  activite.en_promo			= req.body.en_promo; 	
 			  activite.remise			= req.body.remise; 	
			  activite.longitude 		= req.body.longitude;
			  activite.latitude  		= req.body.latitude;
			  activite.save(function(err){
				if(err){
				  res.send(err);
				}
				res.send({message : 'Activité enregistrée'});
			  })
		});

	router.route('/activite/:activite_id')  
	  .get(function(req, res){
		Activite.findOne({_id: req.params.activite_id}, function(err, activites){
		  if(err){
			res.send(err);
		  }
		  res.send(activites);
		});
	  })
	.put(function(req, res){
		Activite.findOne({_id: req.params.activite_id}, function(err, activite){
		  if(err){
			res.send(err);
		  }
			  activite.nbr_place 		= req.body.nbr_place;
		  	  activite.libelle 			= req.body.libelle;
			  activite.type_act 		= req.body.type_act;
			  activite.prix				= req.body.prix;
			  activite.description		= req.body.description;
			  activite.photo 			= req.body.photo;	 
			  activite.condition		= req.body.condition; 
			  activite.visible			= req.body.visible;
			  activite.visible_home		= req.body.visible_home;
			  activite.en_promo			= req.body.en_promo; 	
 			  activite.remise			= req.body.remise; 		
			  activite.longitude 		= req.body.longitude;
			  activite.latitude  		= req.body.latitude;
		  activite.save(function(err){
			if(err){
			  res.send(err);
			}
			res.send({message: 'Activite modifiée'});
		  });
		});
	  })
	.delete(function(req, res){
		Activite.remove({_id: req.params.activite_id}, function(err){
		  if(err){
			res.send(err);
		  }
		  res.send({message: 'Activite supprimée'});
		});
	  });
	// Fin Collections Activite

	module.exports = router;

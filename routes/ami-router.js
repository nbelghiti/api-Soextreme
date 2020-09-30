var express = require('express'),  
  Ami = require('../models/ami-model'),
  router = express.Router();

// Debut Collection Groupe

router.route('/amis/:id_client')  
    .get(function(req, res){
      Ami.find(function(err,amis){
        if(err){
          res.send(err);
        }
        else{res.send(amis);}
      });
    });

router.route('/mesamis/:id_groupe')  
    .get(function(req, res){
      Ami.find({id_groupe: req.params.id_groupe}, function(err,amis){
        if(err){
          res.send(err);
        }
        else{res.send(amis);}
      });
    });
router.route('/ami/add') 
    .post(function(req, res){
      var ami = new Ami();
      ami.nom               = req.body.nom;
      ami.id_client         = req.body.id_client;
      ami.id_client_invite  = req.body.id_client_invite;
      ami.id_groupe         = req.body.id_groupe;
      ami.date_creation 	= req.body.date_creation;

      ami.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'ami enregistré'})};
      })
    });


router.route('/ami/:ami_id')  
  .get(function(req, res){
    Ami.findOne({_id: req.params.ami_id}, function(err, ami){
      if(err){
        res.send(err);
      }
      else{res.send(ami)};
    });
  })
  .put(function(req, res){
    Ami.findOne({_id: req.params.ami_id}, function(err, ami){
      if(err){
        res.send(err);
      } else {
      ami.nom = req.body.nom;
		  ami.id_client = req.body.id_client;
		  ami.id_groupe = req.body.id_groupe;
      groupe.date_creation = req.body.date_creation;
	  }
      ami.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Ami modifié'});}
      });
    });
  })
  .delete(function(req, res){
    Ami.remove({_id: req.params.ami_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Ami supprimé'});}
    });
  });
// Fin Collection Groupe
module.exports = router;
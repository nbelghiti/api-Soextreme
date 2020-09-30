var express = require('express'),  
  Groupe = require('../models/groupe-model'),
  router = express.Router();

// Debut Collection Groupe
router.route('/groupes/:id_client')  
    .get(function(req, res){
      Groupe.find({id_client: req.params.id_client},function(err,groupes){
        if(err){
          res.send(err);
        }
        else{res.send(groupes);}
      });
    });

router.route('/groupes/all')  
.get(function(req, res){
    Groupe.find(function(err, groupes){
      if(err){res.send(err);}
      else{res.send(groupes)};
    });
});
router.route('/groupe/add')
    .post(function(req, res){
      var groupe = new Groupe();
      groupe.nom           = req.body.nom;
      groupe.id_client     = req.body.id_client;
      groupe.nbre_client   = req.body.nbre_client;
      groupe.date_creation = req.body.date_creation;
      groupe.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'Groupe enregistré'})};
      })
    });

router.route('/groupe/:groupe_id')  
  .get(function(req, res){
    Groupe.findOne({_id: req.params.groupe_id}, function(err, groupe){
      if(err){
        res.send(err);
      }
      else{res.send(groupe)};
    });
  })
  .put(function(req, res){
    Groupe.findOne({_id: req.params.groupe_id}, function(err, groupe){
      if(err){
        res.send(err);
      } else {
		  groupe.nom = req.body.nom;
		  groupe.nbre_client = req.body.nbre_client;
		  groupe.date_creation = req.body.date_creation;
	  }
      groupe.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Groupe modifié'});}
      });
    });
  })
  .delete(function(req, res){
    Groupe.remove({_id: req.params.groupe_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Groupe supprimé'});}
    });
  });
// Fin Collection Groupe
module.exports = router;
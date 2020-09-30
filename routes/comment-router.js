var express = require('express'),  
  Commentaire = require('../models/comment-model'),
  router = express.Router();

// Debut Collection Commentaire
router.route('/commentaire/add')  
    .get(function(req, res){
      Commentaire.find(function(err,commentaires){
        if(err){
          res.send(err);
        }
        else{res.send(commentaires);}
      });
    })
    .post(function(req, res){
      var commentaire = new Commentaire();
      commentaire.type = req.body.type;
      commentaire.texte = req.body.texte;
      commentaire.id_act = req.body.id_act;
      commentaire.id_client = req.body.id_client;
      commentaire.id_photo  = req.body.id_photo;
      commentaire.visible = req.body.visible;
      commentaire.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'Commentaire enregistré'});}
      })
    });



router.route('/commentaire/:commentaire_id')  
  .get(function(req, res){
    Commentaire.findOne({_id: req.params.commentaire_id}, function(err, commentaire){
      if(err){
        res.send(err);
      }
      else{res.send(commentaire);}
    });
  })
  .put(function(req, res){
    Commentaire.findOne({_id: req.params.commentaire_id}, function(err, commentaire){
      if(err){
        res.send(err);
      } else{
      commentaire.date = req.body.date;
      commentaire.type = req.body.type;
      commentaire.texte = req.body.texte;
      commentaire.id_act = req.body.id_act;
      commentaire.id_client = req.body.id_client;
      commentaire.id_photo  = req.body.id_photo;
      commentaire.visible = req.body.visible;
	  }
      commentaire.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Commentaire modifié'});}
      });
    });
  })
  .delete(function(req, res){
    Commentaire.remove({_id: req.params.commentaire_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Commentaire supprimé'});}
    });
  });
// Fin Collection Commentaire
	

  module.exports = router;
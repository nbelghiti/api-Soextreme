var express = require('express'),  
    session = require('express-session'),
    Gerant  = require('../models/gerant-model'),
    app     = express(),
    router  = express.Router();

   // app.use(session({secret: 'bobsess'}));


// Debut de la collections gerant 
router.route('/gerant/add')  
    .get(function(req, res){
      Gerant.find(function(err, gerants){
        if(err){
          res.send(err);
        }
        else{res.send(gerants)};
      });
    })
    .post(function(req, res){
      var gerant = new Gerant();
      gerant.nom = req.body.nom;
      gerant.prenom = req.body.prenom;
      gerant.email = req.body.email;
      gerant.password = req.body.password;
      gerant.telephone = req.body.telephone;
      gerant.save(function(err){
        if(err){res.send(err);} 
		else { res.send({message : 'le gerant est enregistré dans le SI'});}
      })
    });
router.route('/gerant/login')
       .get(function (req,res){
			Gerant.find(function(err, gerants){
				if(err){res.send(err);}
				else{res.send(gerants);}
		});
	})
	.post(function(req,res){
		var gerant = new Gerant();
		gerant.email = req.body.email;
		gerant.password = req.body.password;
		Gerant.findOne({email: gerant.email, password: gerant.password},function(err,gerants){
		if(err){res.send(err);}
		else{res.send(gerants);}   
	});
});

router.route('/gerant/:gerant_id')  
  .get(function(req, res){
    Gerant.findOne({_id: req.params.gerant_id}, function(err, gerant){
      if(err){res.send(err);} 
      else{res.send(gerant);}
    });
  })
  .put(function(req, res){
    Gerant.findOne({_id: req.params.gerant_id}, function(err, gerant){
      if(err){
        res.send(err);
      } else {
		  
		  gerant.nom = req.body.nom;
		  gerant.prenom = req.body.prenom;
		  gerant.email = req.body.email;
		  gerant.password = req.body.password;
		  gerant.telephone = req.body.telephone;		  
		  
	  }
      gerant.save(function(err){
        if(err){res.send(err); }
        else{res.send({message: 'Le gerant est mis a jour dans le SI'})};
      });
    });
  })
  .delete(function(req, res){
    Gerant.remove({_id: req.params.gerant_id}, function(err){
      if(err){res.send(err);}
      else{res.send({message: 'gerant supprimé'})};
    });
  });
// Fin de la collections gerant
	

  module.exports = router;
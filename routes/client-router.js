var express = require('express'),  
    session = require('express-session'),
    Client  = require('../models/client-model'),
    app     = express(),
    saltRounds = 4,
    crypto     =require('crypto'),
    /*bcrypt = require('bcrypt'),*/
    router  = express.Router();
var algorithm = 'aes256';
var pwdcrypto = 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3';

   // app.use(session({secret: 'bobsess'}));


// Debut de la collections Client

router.route('/client/add')  
    .get(function(req, res){
      Client.find(function(err, clients){
        if(err){
          res.send(err);
        }
        else{res.send(clients)};
      });
    })
    .post(function(req, res){
      var client = new Client();
      client.nom    = req.body.nom;
      client.prenom = req.body.prenom;
      client.email  = req.body.email;
      client.password = '';
      var cipher = crypto.createCipher(algorithm,pwdcrypto);
      client.password = cipher.update(req.body.password,'utf8','hex');
      client.password += cipher.final('hex');
      client.telephone = req.body.telephone;
      if((typeof(client.nom)=='undefined')&&(typeof(client.prenom)=='undefined')&&(typeof(client.email)=='undefined')&&(typeof(client.password)=='undefined')&&(typeof(client.telephone)=='undefined'))
        { alert('Veuillez renseigner tous les champs SVP ...');}
       else{
              client.save(function(err){
              if(err){res.send(err);} 
              else { res.send({message : 'le client est enregistré dans le SI'});}})
        }
      
    });
router.route('/client/login')
    .get(function (req,res){
			Client.find(function(err, clients){
			if(err){res.send(err);}
			else{res.send(clients);}
		});
	})
	.post(function(req,res){
		var client = new Client();
		client.email = req.body.email;
		client.password = '';
    var cipher = crypto.createCipher(algorithm,pwdcrypto);
    client.password = cipher.update(req.body.password,'utf8','hex');
    client.password += cipher.final('hex');
		Client.findOne({email: client.email, password: client.password},function(err,clients){
		if(err){res.send(err);}
		else{res.send(clients);}   
	});
});

router.route('/client/:client_id')  
  .get(function(req, res){
    Client.findOne({_id: req.params.client_id}, function(err, client){
      if(err){res.send(err);} 
      else{res.send(client);}
    });
  })
  .put(function(req, res){
    Client.findOne({_id: req.params.client_id}, function(err, client){
      if(err){
        res.send(err);
      } else {
		  
		  client.nom = req.body.nom;
		  client.prenom = req.body.prenom;
		  client.email = req.body.email;
		  client.password = '';
      var cipher = crypto.createCipher(algorithm,pwdcrypto);
      client.password = cipher.update(req.body.password,'utf8','hex');
      client.password += cipher.final('hex');
		  client.telephone = req.body.telephone;	  
	  }
      client.save(function(err){
        if(err){res.send(err); }
        else{res.send({message: 'Le client est mis a jour dans le SI'})};
      });
    });
  })
  .delete(function(req, res){
    Client.remove({_id: req.params.client_id}, function(err){
      if(err){res.send(err);}
      else{res.send({message: 'Client supprimé'})};
    });
  });
// Fin de la collections Client
	

  module.exports = router;

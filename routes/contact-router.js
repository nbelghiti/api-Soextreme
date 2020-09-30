var express = require('express'),  
    session = require('express-session'),
    Contact  = require('../models/contact-model'),
    app     = express(),
    router  = express.Router();


router.route('/contact/add')  
    .get(function(req, res){
      Contact.find(function(err, c){
        if(err){
          res.send(err);
        }
        else{res.send(c)};
      });
    })
    .post(function(req, res){
      var contact = new Contact();
      contact.titre    = req.body.titre;
      contact.msg = req.body.msg;
      contact.save(function(err){
        if(err){res.send(err);} 
		else { res.send({message : 'Votre message est enregistré, nous vous répondrons dans 48h '});}
      })
    });

  module.exports = router;
var express = require('express'), 
    Photo  = require('../models/photo-model'),
    router  = express.Router();
var multer = require('multer');
var bodyParser = require('body-parser');
var ok = "ok", ko = "ko", fo ="fo";
var formidable = require('formidable'); // Module qui permet d'uploader un fichier dans le server
var fs = require('fs'); // permet de déplacer le fichier uploader présent dans un dossier temporaire de notre serveur au dossier de notre choix. 

var Storage = multer.diskStorage({
       destination: function (req, file, callback)
     {callback(null, "/home/debian/docker/infra/data/node/ImagesUploader");},
       filename: function (req, file, callback) 
     {
          callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
      fo = file.fieldname + "_" + Date.now() + "_" + file.originalname;
      ko = file.fieldname; // sup
      ok = file.originalname; // sup
       }
});

var upload = multer({ storage: Storage }).array("imgUploader", 1); 

router.route('/photo/afficher/:image_nom').get(function(req,res){
    res.sendFile('/home/debian/docker/infra/data/node/ImagesUploader/'+req.params.image_nom);
    });


router.route('/photo/afficher').get(function(req,res){
        Photo.find(function(err,photos){
          if(err){res.send(err);}
          else{res.send(photos);}});    
 });

router.route('/photo/add')  
  .get(function(req, res){
    res.sendFile(__dirname + "/image.html");
  }	)
  .post(function(req, res){
    upload(req, res, function (err) {
      if (err){
        return res.end("Something went wrong!");
      } else {
        // ajouter bd
          var photo = new Photo();
          //req.body.nom_img = nameIMG;
          photo.nom_img = fo;
          //console.log('---'+nameIMG);
          //photo.email_cli = req.body.email_cli;
          //photo.id_cli = req.body.id_cli;
          //photo.id_activite = req.body.id_activite;
          photo.save(function(err){
            if(err){
              res.send(err);
            } else{
              res.send({message : 'Photo enregistré dans la base Mongodb'})
            };
          })
        }
    })
  });
    
router.route('/photos/:id_cli')  
  .get(function(req, res){
    Photo.find({id_cli: req.params.id_cli}, function(err, photo){
      if(err){
        res.send(err);
      }
      else{res.send(photo)};
    });
  });
  router.route('/photoss/:id_activite')  
  .get(function(req, res){
    Photo.find({id_activite: req.params.id_activite}, function(err, photo){
      if(err){
        res.send(err);
      }
      else{res.send(photo)};
    });
  });
router.route('/photo/:photo_id')  
  .get(function(req, res){
    Photo.findOne({_id: req.params.photo_id}, function(err, photo){
      if(err){
        res.send(err);
      }
      else{res.send(photo)};
    });
  })
  .put(function(req, res){
    Photo.findOne({_id: req.params.photo_id}, function(err, photo){
      if(err){
        res.send(err);
      } else {
          
      photo.nom_img = req.body.nom_img;
      photo.email_cli = req.body.email_cli;
      photo.id_activite = req.body.id_activite;
      photo.id_cli = req.body.id_cli;  
    }
      photo.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Photo modifiée'});}
      });
    });
  })
  .delete(function(req, res){
    Photo.remove({_id: req.params.photo_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Photo supprimée'});}
    });
  });
// Fin Collection Note


  

  module.exports = router;

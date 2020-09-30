const express	= require('express');
const Images 	= require('../models/image-model');
const router 	= express();
const multer  = require('multer');
//const upload = multer ({ dist : 'ImageUploader/' })
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
//const app = Express();
const ok = "ok", ko = "ko", fo ="fo";
var nom = "ok"/*
const Storagee = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'ImagesUploader/');
    },
    filename: function (req, file, cb) {
      nom = Date.now() + '-' + file.originalname;
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });*/

//app.use(bodyParser.json());
//app.use(express.static('img_tmp'));
const formidable = require('formidable'); // Module qui permet d'uploader un fichier dans le server
const fs = require('fs'); // permet de déplacer le fichier uploader présent dans un dossier temporaire de notre serveur au dossier de notre choix. 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './ImagesUploader');
  },
  filename: function(req, file, cb) {
    console.log('mulet',file.originalname);
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
/*
router.post("/images/ajouter", upload.single('image'), (req, res, next) => {
    const images          = new Images();
    images.nom_img        = nom;
    images.id_cli         = req.body.id_cli;
    images.id_activite    = req.body.id_activite;

    images.save(function(err){
      if(err){res.send(err);}
      else{res.send({message : 'images a ete ajouté'})};
    });
});*/
router.post("/images/ajouter", upload.single('nom_img'), (req, res, next) => {

  console.log("1",res.file);
  const image = new Images({
    id_cli: req.body.id_cli,
    email_cli: req.body.email_cli,
    id_activite: req.body.id_activite,
    nom_img:  req.file.path
  });
  console.log("2",res.file);
  image
    .save()
    .then(result => {
      console.log("3",result);
      res.status(201).json({
        message: "Created photo successfully",
        createdImages: {
            id_cli: result.id_cli,
            nom_img: result.nom_img,
            email_cli: result.email_cli,
            id_activite:result.id_activite,
            _id: result._id
        }
      });
    })
    .catch(err => {
      console.log("4",err);
      res.status(500).json({
        error: err
      });
    });
});
router.get("/image/:nom_img", (req, res, next) => {
  const id = req.params.nom_img;
  Images.findById(id)
    .select('_id nom_img id_cli id_activite nom_img')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:4040/images'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.route('/images/afficher/:image_nom')  //Pour afficher l' image depuis le dossier imgUploader
  .get(function(req,res){
    //res.sendfile(path.resolve(path.resolve(__dirname,req.params.image_nom)));
    res.sendfile(path.resolve(path.resolve('./ImagesUploader/'+req.params.image_nom)));
  }
);


router.route('/images/afficher').get(function(req,res){
  Images.find(function(err,photos){
    if(err){
      res.send(err);
    } else{
      res.send(photos);
    }
  });    
});

router.route('/images/add').post(function(req, res){
  upload(req, res, function (err) {
    if (err){
      return res.end("Something went wrong!");
    } else{
      res.write(" FieldName : "+ko+" / OriginalName :"+ok);
      res.write("\n"+fo+"\n");
      res.write("File uploaded sucessfully!");
    }
  });
});

router.route('/images/:id_cli')  
  .get(function(req, res){
    Images.findOne({_id: req.params.id_cli}, function(err, photo){
      if(err){
        res.send(err);
      }
      else{res.send(photo)};
    });
  })
  .put(function(req, res){
    Images.findOne({_id: req.params.id_cli}, function(err, photo){
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
    Images.remove({_id: req.params.id_cli}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Photo supprimée'});}
    });
  });

module.exports = router;
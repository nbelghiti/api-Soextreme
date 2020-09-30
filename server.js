var express 				= require('express'),  
	session					= require('express-session'),
	bodyParser 				= require('body-parser'),
	mongoose 				= require('mongoose'),
	helmet					= require('helmet'),
	morgan					= require('morgan'),
	cors					= require('cors'),
	fs  					= require('fs'),
	path  					= require('path'),
	multer                  = require('multer'),
	port 					= process.env.PORT || 4040,
	app 					= express(),

  /* ************** Configuration site *********************** */
	config_path				= __dirname+'/config',
	config 					= require(config_path+'/config'),
	environment 			= require(config_path+'/environment'),
	node_environnement		= process.env.NODE_ENV || environment.site,

  /* ************** Modèles *********************** */
  
	models_path				= __dirname+'/models',
  
	Activite 				= require(models_path+'/activites-model'),
	Client 					= require(models_path+'/client-model'),
	Commentaire 			= require(models_path+'/comment-model'),
	Note 					= require(models_path+'/note-model'),
	Photo 					= require(models_path+'/photo-model'),
	Reservation 			= require(models_path+'/reservation-model'),
	Gerant 					= require(models_path+'/gerant-model'),
	Paiement 				= require(models_path+'/paiement-model'),
	Contact 				= require(models_path+'/contact-model'),
	Planing 				= require(models_path+'/planing-model'),
	Groupe 					= require(models_path+'/groupe-model'),
	Employe 				= require(models_path+'/employe-model'),
	Ami 					= require(models_path+'/ami-model'),
	Images 					= require(models_path+'/image-model'),


  
  /* ************** Import Routes *********************** */
  
	router_path 			= __dirname+'/routes',
  
	Activite_router 		= require(router_path+'/activites-router'),
	Client_router 			= require(router_path+'/client-router'),
	Commentaire_router		= require(router_path+'/comment-router'),
	Note_router 			= require(router_path+'/note-router'),
	Photo_router 			= require(router_path+'/photo-router'),
	Reservation_router 		= require(router_path+'/reservation-router'),
	Employe_router 		    = require(router_path+'/employe-router'),
	Paiement_router 		= require(router_path+'/paiement-router'),
	Contact_router 		    = require(router_path+'/contact-router'),
	Planing_router 		    = require(router_path+'/planing-router'),
	Groupe_router 		    = require(router_path+'/groupe-router'),
	Gerant_router 			= require(router_path+'/gerant-router'),
	Image_router 			= require(router_path+'/image-router'),
	Ami_router 				= require(router_path+'/ami-router');

  
  /* ************** Configuration de la bdd  *********************** */
	
	app.set('dbUrl', config.db[node_environnement]);

  /* ************** Connexion à la bdd  *********************** */

	//app.use(express.static(__dirname + '../ImagesUploader')); //modif  
	app.use('/ImagesUploader', express.static('../ImagesUploader'))
	//mongoose.connect('mongodb://mongodb');
	//mongoose.connect('mongodb://localhost:27017')
	mongoose.connect('mongodb://lamine:Lamine123@mongodb:27017', { useMongoClient: true });
	/*mongoose.connect('mongodb://user:pass@localhost:port/database');*/
	var connexion = mongoose.connection;
	connexion.on('error', console.error.bind(console, 'Impossible de se connecter à la base MongoDB'));
	connexion.once('open', function() {
	  console.log('Connexion à la base MongoDB');
	});


  /* **************  *********************** */
	mongoose.Promise = global.Promise;

	app.use(bodyParser.json());
	app.use(helmet());
    app.use(morgan('combined', {
 		skip: function (req, res) { return res.statusCode < 400 }
	}));
	app.use(cors());



  /* ************** Gestion des Headers *********************** */
  	app.use(function(req, res, next) {
  		var err = new Error("not found");
  		err.status = 404;
  		next();
  	})
	app.use(function(err, req, res, next) {

	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  if (req.method === 'OPTIONS') {
	  	res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	  	return res.json(200)
	  } else {
	  	console.log('err-header',500)
	  	res.status(500).json({
	  		error: err
	  	});
	  }
	  next();
	});

	//app.use('/ImagesUploader',express.static('ImagesUploader'));
	
	/* ************** Utilisation des Routes  *********************** */

	// Debut routes

	app.use(Activite_router);
	app.use(Client_router);
	app.use(Commentaire_router);
	app.use(Note_router);
	app.use(Photo_router); 
	app.use(Reservation_router);
	app.use(Gerant_router);
	app.use(Employe_router);
	app.use(Paiement_router);
	app.use(Planing_router);
	app.use(Groupe_router);
	app.use(Ami_router);
	app.use(Contact_router);
	app.use(Image_router);
	//app.use(express.static('ImagesUploader/'));


	// Fin Routes



	
	app.get('/', function (req, res, next) {

		res.send('<html><body><p>Server Debian 9 API NodeJS starting on port '+port+'</p></body></html>');

	});
     /* bcrypt.hash(mypp,saltRounds, function(err,hash){
           console.log(mypp);
          console.log(hash);
        });*/

	app.listen(port, function(){  
	  console.log('listening on port ' + port);
	});     

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupeSchema = mongoose.Schema({
  nom 			: {type:String},
  id_client 	: {type:String},
  nbre_client 	: {type:Number},
  date_creation	: {type:Date, default: Date.now}			  
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Groupe = mongoose.model("Groupe" ,GroupeSchema);
module.exports = Groupe;
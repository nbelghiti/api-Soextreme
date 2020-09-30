var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeSchema = mongoose.Schema({  
  nom: {type:String},
  prenom: {type:String},
  email : {type:String},
  password : {type:String},
  telephone: {type:String},
  departement: {type:String},
  statut: {type:String},
  nbre_heure: {type:Number}
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Employe = mongoose.model("Employe" ,EmployeSchema);
module.exports = Employe;
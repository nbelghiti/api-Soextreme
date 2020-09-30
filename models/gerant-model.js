var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GerantSchema = mongoose.Schema({  
  nom: {type:String},
  prenom: {type:String},
  email : {type:String},
  password : {type:String},
telephone: {type:String}
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Gerant = mongoose.model("Gerant" ,GerantSchema);
module.exports = Gerant;

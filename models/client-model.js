var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = mongoose.Schema({  
  nom: {type:String},
  prenom: {type:String},
  email : {type:String},
  password : {type:String},
telephone: {type:String}
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Client = mongoose.model("Client" ,ClientSchema);
module.exports = Client;

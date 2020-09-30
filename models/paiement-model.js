var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaiementSchema = mongoose.Schema({
  somme	: {type:Number},
  date_pmt		: {type:Date, default: Date.now}			  
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Paiement = mongoose.model("Paiement" ,PaiementSchema);
module.exports = Paiement;
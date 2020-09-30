var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaningSchema = mongoose.Schema({
  heure_in 	: {type:String},
  heure_out 	: {type:Number},
  date_plg		: {type:Date, default: Date.now}			  
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Planing = mongoose.model("Planing" ,PlaningSchema);
module.exports = Planing;
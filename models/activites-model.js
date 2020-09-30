var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActiviteSchema = mongoose.Schema({
  libelle 	   : {type:String},
  type_act 	   : {type:String},
  prix		     : {type:Number},
  remise 	     : {type:Number},
  description  : {type:String},
  photo 	     : {type:String},
  condition	   : {type:String},  
  en_promo     : {type:Boolean, default: false},
  visible      : {type:Boolean, default: false},
  visible_home : {type:Boolean, default: false},
  longitude    : {type:Number},
  latitude     : {type:Number},
  nbr_place     : {type:Number}
				  
},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Activite = mongoose.model("Activite" ,ActiviteSchema);
module.exports = Activite;

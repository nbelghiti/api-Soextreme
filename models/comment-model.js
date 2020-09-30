var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = mongoose.Schema({

  type : {type:String, enum: ['photo', 'activite'], default:'activite'},
  texte : {type:String},
  date : {type:Date},
  id_act :{type:String},
  id_client :{type:String},
  id_photo:{type:String},
  visible 	: {type:Boolean, default:true}

},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Commentaire = mongoose.model("Commentaire" ,CommentSchema);
module.exports = Commentaire;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = mongoose.Schema({
   nom_img : {type:String},
  // email_cli : {type:String},
  id_cli : {type:String},
  id_activite : {type:String}

},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Photo = mongoose.model("Photo" ,PhotoSchema);
module.exports = Photo;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = mongoose.Schema({
   nom_img : { type: String, required: true },
  email_cli : {type:String},
  id_cli : {type:String},
  id_activite : {type:String}

},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Images = mongoose.model("Images" ,ImageSchema);
module.exports = Images;

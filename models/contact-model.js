var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = mongoose.Schema({  
  titre: {type:String},
  msg: {type:String},
},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Contact = mongoose.model("Contact" ,ContactSchema);
module.exports = Contact;

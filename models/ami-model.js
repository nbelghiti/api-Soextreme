var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AmiSchema = mongoose.Schema({
	nom 			: {type:String},
	id_client_invite: {type:String},
	id_client 		: {type:String},
	id_groupe 		: {type:String},
 	date_creation	: {type:Date, default: Date.now}		

},
{ versionKey: false, created: { type: Date, default: Date.now }});

var Ami = mongoose.model("Ami" ,AmiSchema);
module.exports = Ami;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = mongoose.Schema({
	id_act		 : {type:String},
	prix 		 : {type:Number},
	date_rsv 	 : {type:String},
	heure_in 	 : {type:String},
	heure_out 	 : {type:String},
	heure_creuse : {type:Boolean, default: false},
	id_cli 		 : {type:String},
	nb_pers		 : {type:Number, default:1},
	session		 : {type:String},
	statut  	 : {type:String, enum: ['non-reserve', 'reserve','annule','en cours','fait']},
	date		 : {type:String}
},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Reservation = mongoose.model("Reservation" ,ReservationSchema);
module.exports = Reservation;

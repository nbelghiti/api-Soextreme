var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = mongoose.Schema({
  note 		: {type:Number, min:1, max:5},
  type 		: {type:String, enum: ['photo', 'activite']},
  id_client : {type:String},
  id_act 	:{type : String}
},
{ versionKey: false, created: { type: Date, default: Date.now }, timestamps:true});

var Note = mongoose.model("Note" ,NoteSchema);
module.exports = Note;

var express = require('express'),  
  Note = require('../models/note-model'),
  router = express.Router();

// Debut Collection Note
router.route('/note/add')  
    .get(function(req, res){
      Note.find(function(err,notes){
        if(err){
          res.send(err);
        }
        else{res.send(notes);}
      });
    })
    .post(function(req, res){
      var note = new Note();
      note.note = req.body.note;
      note.type = req.body.type;
      note.id_client = req.body.id_client;
      note.id_act = req.body.id_act;

      note.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message : 'Note enregistrée'})};
      })
    });

router.route('/note/:note_id')  
  .get(function(req, res){
    Note.findOne({_id: req.params.note_id}, function(err, note){
      if(err){
        res.send(err);
      }
      else{res.send(note)};
    });
  })
  .put(function(req, res){
    Note.findOne({_id: req.params.note_id}, function(err, note){
      if(err){
        res.send(err);
      } else {
		 		  
		  note.note = req.body.note;
		  note.type = req.body.type;
      note.id_client = req.body.id_client;
      note.id_act = req.body.id_act;
      
		  
	  }
      note.save(function(err){
        if(err){
          res.send(err);
        }
        else{res.send({message: 'Note modifiée'});}
      });
    });
  })
  .delete(function(req, res){
    Note.remove({_id: req.params.note_id}, function(err){
      if(err){
        res.send(err);
      }
      else{res.send({message: 'Note supprimée'});}
    });
  });
// Fin Collection Note


	

  module.exports = router;
var express = require('express'),  
  Reservation = require('../models/reservation-model'),
  router = express.Router();


router.route('/reservationcheck/:date/:heure_in')
    .get(function(req, res){
      Reservation.find({date: req.params.date, heure_in:req.params.heure_in},function(err, reservations){
        if(err){
          res.send(err);
          console.log(err);
        } else{
          res.send(reservations);
          console.log(reservations);
        };
      });
    });
router.route('/reservationcheckBydate/:date')
    .get(function(req, res){
      Reservation.find({date: req.params.date},function(err, reservations){
        if(err){
          res.send(err);
          console.log(err);
        } else{
          res.send(reservations);
          console.log(reservations);
        };
      });
    });

router.route('/reservation/add')  
.get(function(req, res){
    Reservation.find(function(err, reservations){
      if(err){res.send(err);}
      else{res.send(reservations)};
    });
})
.post(function(req, res){
  var reservation = new Reservation();
  reservation.prix  = req.body.prix;
  reservation.date_rsv  = req.body.date_rsv;
  reservation.date  = req.body.date;
  reservation.heure_in  = req.body.heure_in;
  reservation.heure_out = req.body.heure_out;
  reservation.id_cli    = req.body.id_cli;
  reservation.nom_act   = req.body.nom_act;
  reservation.id_act    = req.body.id_act;
  reservation.statut    = req.body.statut;
  reservation.session   = req.body.session;
  reservation.nb_pers   = req.body.nb_pers;
  reservation.heure_creuse = req.body.heure_creuse;

  reservation.save(function(err){
    if(err){res.send(err);}
    else{res.send({message : 'Reservation enregistrée'})};
  })
});
router.route('/reservations/:client_id')
    .get(function(req, res){
      Reservation.find({id_cli: req.params.client_id },function(err, reservations){
        if(err){res.send(err);}
        else{res.send(reservations)};
      });
    });

router.route('/reservationsnbr/:id_act')
    .get(function(req, res){
      Reservation.find({id_act: req.params.id_act },function(err, reservations){
        if(err){res.send(err);}
        else{res.send(reservations)};
      });
    });

router.route('/reservation/:reservation_id')  
  .get(function(req, res){
    Reservation.findOne({_id: req.params.reservation_id}, function(err, reservation){
      if(err){res.send(err);}
      else{res.send(reservation)};
    });
  })
  .put(function(req, res){
    Reservation.findOne({_id: req.params.reservation_id}, function(err, reservation){
      if(err){res.send(err);}
      //else{
      reservation.prix      = req.body.prix;
		  reservation.date_rsv  = req.body.date_rsv;
      reservation.heure_in  = req.body.heure_in;
      reservation.heure_out = req.body.heure_out;
      reservation.id_cli    = req.body.id_cli;
      reservation.nom_act   = req.body.nom_act;
      reservation.id_act    = req.body.id_act;
      reservation.statut    = req.body.statut;
      reservation.session   = req.body.session;
      reservation.date      = req.body.date;
      reservation.nb_pers   = req.body.nb_pers;
      reservation.heure_creuse = req.body.heure_creuse;


	 // }
      reservation.save(function(err){
        if(err){res.send(err);}
        else{res.send({message: 'Reservation modifiée'})};
      });
    });
  })
  .delete(function(req, res){
    Reservation.remove({_id: req.params.reservation_id}, function(err){
      if(err){res.send(err);}
      else{res.send({message: 'Reservation supprimée'})};
    });
  });
// Fin Collection Reservation
  module.exports = router;

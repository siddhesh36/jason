const express = require('express');
const fs = require('fs');
const tdata = require('../teaser.json');
const count = require('../counterid.json');
const router = express.Router();

/* GET home page. */
router.get('/index-teaser', function(req, res, next) {
    var sample = [];
      for (let oned of tdata) {
        sample = sample.concat(oned);
      }
      res.render('tindex', {data:sample});
});

/* Add data. */
router.post('/addteaser', (req, res) => {
  // We will be coding here
    var errors = [];
    var id;
    var generateId = function (prefix, start) {
      var i = start || 0;
      return function() {
          return prefix + i++;
      };
    };
    
    var data_old = {
      "ticket" : req.body.ticket,
      "title" : req.body.title,
      "country" : req.body.country,
      "position" : req.body.position,
      "startdate" : req.body.startdate,
      "enddate" : req.body.enddate
    };

    if ((Date.parse(req.body.startdate) >= Date.parse(req.body.enddate))) {
      errors.push("End date should be greater than Start date");
    }
    if (errors.length>0){
      res.render("teasers", { data:data_old, errors : errors});
    } else {
      id = generateId("idofobject_", count.counter); // start the counter at increment
    }
    
    var c = count.counter++;
    fs.writeFile("counterid.json", JSON.stringify(count), err => { 
      // Checking for errors 
      if (err) throw err;
    });
      var genid = id();
      // Output the book to the console for debugging
      let data = {
        "id" : genid,
        "ticket" : req.body.ticket,
        "title" : req.body.title,
        "country" : req.body.country,
        "position" : req.body.position,
        "startdate" : req.body.startdate,
        "enddate" : req.body.enddate
      };
      tdata.push(data);
      fs.writeFile("teaser.json", JSON.stringify(tdata, null, 2), err => { 
        // Checking for errors 
        if (err) throw err;  
        console.log("Done writing"); // Success 
      });
      req.flash('success_msg', "Homepage teaser added");
      res.redirect('/index-teaser');
});

router.get('/tedit/:id', (req, res) => {
  let idea = req.params.id;
    // Searching id for the with param
    for (let oned of tdata) {
      if (oned.id === idea) {
          res.render('teaser-update', {data:oned});
          return;
      }
    }

  // Sending 404 when not found something is a good practice
  res.status(404).send('data not found');
});

router.post('/tupdate/:id', (req, res) => {
  var errors = [];
  let idea = req.params.id;
    if ((Date.parse(req.body.startdate) >= Date.parse(req.body.enddate))) {
      errors.push("End date should be greater than Start date");
    }
    if (errors.length>0){
      for (let oned of tdata) {
        if (oned.id === idea) {
            res.render('teaser-update', {data:oned,errors:errors});
            return;
        }
      }
    } else {
    var newid = req.params.id;
    //Searching id for the with param
      tdata.forEach(cold => {
        if(cold.id == newid){
          var tbd = tdata.indexOf(cold);
          tdata.splice(tbd,1);
        }
      });
      let data = {
        "id" : req.params.id,
        "ticket" : req.body.ticket,
        "title" : req.body.title,
        "country" : req.body.country,
        "position" : req.body.position,
        "startdate" : req.body.startdate,
        "enddate" : req.body.enddate
      };
      tdata.push(data);
      fs.writeFileSync("teaser.json", JSON.stringify(tdata, null, 2), err => { 
        // Checking for errors 
        if (err) throw err;  
        console.log("Done Update"); // Success 
      });
      req.flash('success_msg', "Teaser Updated");
      res.redirect("../index-teaser");
    }
});

router.post('/tdelete/:id', (req, res) => {
    var newid = req.params.id;
    // Searching id for the with param
      tdata.forEach(cold => {
        if(cold.id == newid){
          var tbd = tdata.indexOf(cold);
          tdata.splice(tbd,1);
        }
      });
      fs.writeFileSync("teaser.json", JSON.stringify(tdata, null, 2), err => { 
        // Checking for errors 
        if (err) throw err;  
        console.log("Done Update"); // Success 
      });
      req.flash('success_msg', "Homepage teaser removed");
      res.redirect("../index-teaser"); 
});

router.get('/teasers', (req, res) => {
  
  var blankd = {
    "ticket" : "",
    "title" : "",
    "country" : "",
    "position" : "",
    "startdate" : "",
    "enddate" : ""
  };

  res.render('teasers', {data:blankd});
});

module.exports = router;
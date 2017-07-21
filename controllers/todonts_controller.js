//==============================
// REQUIREMENTS
//==============================

var express = require("express");
var router = express.Router();
var todonts = require('../models/todonts.js');
/* INDEX todonts */
router.get('/', function(req,res) {
  res.render('todonts/index', {
    todonts: todonts.seededTodonts
  });
});

/* NEW TODONT */
router.get('/new', (req, res) => {
  res.render('todonts/new');
})

/* SHOW TODONT */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const todont = todonts.seededTodonts[id];
  res.render('todonts/show',{
    todont: todont,
    id: id
  });
});

/* EDIT TODONT */
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  const todont = todonts.seededTodonts[id];
  res.render("todonts/edit", {
    todont: todont,
    id: id
  })
});

/* UPDATE TODONT */
router.put('/:id', (req, res) => {
  // We have the ID
  const id = req.params.id;
  // Use the id to grab specific index in array
  const todo = todonts.seededTodonts[id];
  // Update the description and urgent values
  todont.description = req.body.description;
  todont.urgent = req.body.urgent;
  // redirect back to individual todo
  res.method = "GET";
  res.redirect(`/todonts/${id}`);
});

/* SAVE TODONT */
router.post('/', (req, res) => {
  console.log(req.body);

  const newTodont = {
    description: req.body.description,
    urgent: req.body.urgent
  };
  todonts.seededTodonts.push(newTodont);

  res.redirect("/todonts");
});

/* DELETE TODONT */
router.delete('/:id', (req, res) => {
  todonts.seededTodonts.splice(req.params.id, 1);

  res.method= "GET";
  res.redirect("/todonts");
});


module.exports = router;
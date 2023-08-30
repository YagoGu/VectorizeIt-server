const express = require("express");
const router = express.Router();
const Videogame = require('../models/Videogame.model');

router.get("/", (req, res, next) => {
  Videogame.find().
  then((videogames) => {
    res.send(videogames)
  })
});

module.exports = router;

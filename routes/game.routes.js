const express = require("express");
const router = express.Router();
const Videogame = require('../models/Videogame.model');

//obtain data from a videogame
router.get("/:idGame", (req, res, next) => {

    const {idGame} = req.params;

    Videogame.findById(idGame)
    .then((videogame) => {
        res.send(videogame)
    })
});

router.post("/:idGame/add", (req, res, next) => {

    const {idGame} = req.params;

})

module.exports = router;
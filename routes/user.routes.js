const express = require("express");
const router = express.Router();
const User = require('../models/User.model');
const Videogame = require('../models/Videogame.model');


// create a new game for the db
router.post("/:idUser/create", (req, res, next) => {

    const {idUser} = req.params;

    console.log(idUser)

    Videogame.create({
        title: "Pepe",
        corporation: "Bugisoft",
        description: "You will need to bonk everyone",
        pegi: "pegi16",
        contributed_by: idUser
    })
})

//display your created games
router.get("/:idUser/created-games", (req, res, next) => {

    const {idUser} = req.params;

    Videogame.find( {contributed_by: idUser} )
    .then((videogames) => {
        res.send(videogames)
    })
})


module.exports = router;
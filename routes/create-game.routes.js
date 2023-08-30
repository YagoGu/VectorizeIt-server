const express = require("express");
const router = express.Router();
const User = require('../models/User.model');
const Videogame = require('../models/Videogame.model');

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

module.exports = router;
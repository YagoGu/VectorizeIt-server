const express = require("express");
const router = express.Router();
// const User = require('../models/User.model');
const Videogame = require('../models/Videogame.model');

// create a new game for the db
router.post("/:idUser/create", (req, res, next) => {

    const {idUser} = req.params;

    Videogame.create({
        title: "Dori",
        corporation: "Walt",
        description: "You will need to remember",
        pegi: "pegi3",
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

// modify a created game
router.post("/:idUser/:idGame/update", (req, res, next) => {

    const {idUser, idGame} = req.params;

    Videogame.findOneAndUpdate( 
        { $and: [ {contributed_by: idUser}, {_id: idGame}]},
        {title: "Edu el tijeras"}
    )
    .then((videogames) => {
        res.send(videogames)
    })
})

//delete a game created by you
router.post("/:idUser/:idGame/delete", (req, res, next) => {

    const {idUser, idGame} = req.params;

    Videogame.findOneAndDelete( 
        { $and: [ {contributed_by: idUser}, {_id: idGame}]}
    )
    .then( (videogame) => {
        res.send(videogame)
    })

})

module.exports = router;
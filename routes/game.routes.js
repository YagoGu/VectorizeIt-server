const express = require("express");
const router = express.Router();
const Videogame = require('../models/Videogame.model');
const User = require('../models/User.model');

//obtain data from a videogame
router.get("/:idGame", (req, res, next) => {

    const {idGame} = req.params;

    Videogame.findById(idGame).populate('contributed_by')
    .then((videogame) => {
        res.send(videogame)
    })
});

//add game as played
router.post("/:idUser/:idGame/add", (req, res, next) => {

    const {idUser, idGame} = req.params;
    
    User.findByIdAndUpdate(
        idUser, 
        {$push: {games_played: idGame }
    })
    .then((videogame) => {
        res.send(videogame)
    })

})

//see your played games
router.get("/:idUser/played-games", (req, res, next) => {

    const {idUser} = req.params;

    User.findById(idUser)
    .then((videogames) => {
        res.send(videogames.games_played)
    })
})

//delete one game from your played list
router.post("/:idUser/:idGame/unadd", (req, res, next) => {

    const {idUser, idGame} = req.params;

    User.findByIdAndUpdate(
        idUser,
        {$pull : {games_played: idGame}
    })
    .then((videogames) => {
        res.send(videogames.games_played)
    })
})

module.exports = router;
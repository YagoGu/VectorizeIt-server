const express = require("express");
const router = express.Router();
const Videogame = require('../models/Videogame.model');
const User = require('../models/User.model');

//obtain data from a videogame
router.get("/:idGame", (req, res, next) => {

    const {idGame} = req.params;

    Videogame.findById(idGame)
    .populate("contributed_by")  // Populate contributed_by field
    .populate([{
        path: "reviews",  // Populate reviews field
        model: "Review",  // Specify the model to populate
        populate: {
            path: "created_by",  // Populate created_by field within reviews
            model: "User",  // Specify the model to populate
        }}])
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
router.get("/:idUser/games-played", (req, res, next) => {

    const {idUser} = req.params;

    User.findById(idUser).populate('games_played')
    .then((videogames) => {
        res.send(videogames)
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
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Videogame = require('../models/Videogame.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model')

//get your user info
router.get("/:idUser", (req, res, next) => {

    const {idUser} = req.params;

    User.findById(idUser).populate('games_played')
    .then( (user) => {
        res.send(user)
    })
})

//update your user info
router.post("/:idUser/update", (req, res, next) => {
    const {idUser} = req.params;
    const {username, email, birthday, password, profile_picture} = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.findByIdAndUpdate(idUser, 
        {
            username,
            email,
            birthday,
            profile_picture,
            password: hashedPassword
        })
    .then( (user) => {
        res.send(user)
    })
})

//delete user
router.post("/:idUser/delete", (req, res, next) => {
    
    const {idUser} = req.params;

    User.findByIdAndDelete(idUser)
    .then ((user) => {
        //delete every review related to the user
        Review.deleteMany({created_by: idUser})
        .then ((reviews) => {
            res.send(reviews)
        })  
    })

})

// create a new game for the db
router.post("/:idUser/create", (req, res, next) => {
    // , fileUploader.single('videogame_picture')
    const {idUser} = req.params;
    const {title, corporation, description, pegi, videogame_picture} = req.body

    Videogame.create({
        title,
        corporation,
        description,
        pegi,
        videogame_picture,
        contributed_by: idUser
    })
    // videogame_picture: req?.file.path
})

//display your created games
router.get("/:idUser/created-games", (req, res, next) => {

    const {idUser} = req.params;

    Videogame.find( {contributed_by: idUser} ).populate('reviews')
    .then((videogames) => {
        res.send(videogames)
    })
})

// modify a created game
router.post("/:idUser/:idGame/update", (req, res, next) => {

    const {idUser, idGame} = req.params;
    const {title, corporation, description, pegi, videogame_picture} = req.body

    Videogame.findOneAndUpdate( 
        { $and: [ {contributed_by: idUser}, {_id: idGame}]},
        {
            title,
            corporation,
            description,
            pegi,
            videogame_picture
        }
    )
    .then((videogames) => {
        res.send(videogames)
    })
})

//delete a game created by you
router.post("/:idUser/:idGame/delete", (req, res, next) => {

    const {idUser, idGame} = req.params;
    /*
    Videogame.findOneAndDelete( 
        { $and: [ {contributed_by: idUser}, {_id: idGame}]}
    )
    .then( (videogame) => {

        res.send(videogame)
    })

    Review.deleteMany(
        {related_to: idGame}
    )
    .then( (reviews) => {
        res.send(reviews)
    })*/

    Videogame.findOneAndDelete(
        { $and: [ {contributed_by: idUser}, {_id: idGame}]}
    )
    .then( () => {
        Review.deleteMany({related_to: idGame})
        .then(() => {
            User.updateMany(
                {games_played: { $in: [idGame] }},
                {$pull: {games_played: idGame}}
            )
            .then(() => {
                res.send("Game, reviews related to it and on games played removed")
            })
        } )
    })
    
})

module.exports = router;
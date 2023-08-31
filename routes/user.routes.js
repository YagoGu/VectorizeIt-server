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

    User.findById(idUser)
    .then( (user) => {
        res.send(user)
    })
})

//update your user info
router.post("/:idUser/update", (req, res, next) => {
    const {idUser} = req.params;
    // const {password} = req.body
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync("password", salt);

    User.findByIdAndUpdate(idUser, 
        {
            username: "pepitodelospalotes",
            email: "pepito@gmail.com",
            birthday: "0006-05-12",
            profile_picture: "https://www.cnet.com/a/img/resize/61c44c6765cb6b8529df884935ad7aefc622aeec/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=675&width=1200",
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
    .then ((user) => res.send(user))

    //delete every review related to the user
    Review.deleteMany({created_by: idUser})
    .then ((reviews) => res.send(reviews))
})

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

    Review.deleteMany(
        {related_to: idGame}
    )
    .then( (reviews) => {
        res.send(reviews)
    })
})

module.exports = router;
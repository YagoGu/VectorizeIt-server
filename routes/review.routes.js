const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Videogame = require("../models/Videogame.model");

//modify a review
router.post("/:idReview/update", (req, res, next) => {

    const {idReview} = req.params;
    const {description, rate, playedHours} = req.body;

    Review.findByIdAndUpdate(idReview, {
        rate,
        description,
        played_hours: playedHours,
    })
    .then((rev) => res.send(rev))
})

//delete a review
router.post("/:idReview/delete", (req, res, next) => {

    const {idReview} = req.params;

    Review.findByIdAndDelete(idReview)
    .then((rev) => res.send(rev))

})

//create a review
router.post("/:idUser/:idGame/create", (req, res, next) => {

    const {idUser, idGame} = req.params;
    const {description, rate, playedHours} = req.body;

    Review.create({
        created_by: idUser,
        related_to: idGame,
        rate,
        description,
        played_hours: playedHours
    })
    .then(() => {
        Review.findOne({created_by: idUser, related_to: idGame})
        .then((review) => {
            return review
        })
        .then((data) => {
            console.log(data)
            Videogame.findByIdAndUpdate(idGame, {$push: {reviews: data._id} })
            .then((game) => {return (
                console.log(game.reviews)
            )})
        })
    })

    // .then((rev) => res.send(rev))

    console.log(description, rate, playedHours, idUser, idGame)

})

//obtain all reviews of a game
router.get("/:idGame/all", (req, res, next) => {

    const {idGame} = req.params;

    Review.find({related_to: idGame})
    .populate('created_by')
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error("Error fetching reviews:", error);
        res.status(500).send("An error occurred while fetching reviews.");
    })
})

//obtain your review of game
router.get("/:idUser/:idGame", (req, res, next) => {
    const {idUser, idGame} = req.params;
    
    Review.findOne({created_by: idUser, related_to: idGame})
    .then((rev) => {
        console.log(idUser, idGame)
        return res.send(rev)
    })

})


module.exports = router;
const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const Videogame = require("../models/Videogame.model");

//modify a review
router.post("/:idReview/update", (req, res, next) => {

    const {idReview} = req.params;

    Review.findByIdAndUpdate(idReview, {
        rate: 6,
        description: "Genial",
        played_hours: 700
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

    Review.create({
        created_by: idUser,
        related_to: idGame,
        rate: 7,
        description: "kk",
        played_hours: 20
    })
    .then((rev) => res.send(rev))

})

//obtain all reviews of a game
router.get("/:idGame/all", (req, res, next) => {

    const {idGame} = req.params;

    Review.find({related_to: idGame})
    .then((data) => {
        res.send(data)
    })
    .catch((error) => {
        console.error("Error fetching reviews:", error);
        res.status(500).send("An error occurred while fetching reviews.");
    })
})

//obtain a review of game
router.get("/:idUser/:idGame", (req, res, next) => {

    const {idUser, idGame} = req.params;

    Review.find({created_by: idUser, related_to: idGame})

    .then((rev) => res.send(rev))

})


module.exports = router;
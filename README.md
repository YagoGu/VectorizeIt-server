# Welcome to VectorizeIt server !!!

## Programming lenguages, frameworks and libraries
- JavaScript
- Bcrypt
- Cloudinary
- Cors
- Dotenv
- Express.js
- Jsonwebtoken
- Mongoose

## Models

- Review
- User
- Videogame

## Link to deploy

[VectorizeIt api] (https://vectorizeit.adaptable.app)

Description | method | Route 
------------- | ------------- | -------------
Obtain videogames from DB to display on Main page | get | / 
Login as user | post | /login 
Sign up as user | post | /signup 
Log out from website | post | user/:idUser/logout
Obtain user created games from DB to display | get | user/:idUser/created-games
Create a new game | post | user/:idUser/create-game
Modify game data | post | user/:idUser/:idGame/update
Delete game data and every review related | post | user/:idUser/:idGame/delete
Obtain game data from DB to display | get | game/:idGame
Add game as played | post | game/:idUser/:idGame/add
Obtain your played games data from DB to display | get | game/:idUser/played-games
Delete one game of your games played list | post | game/:idUser/:idGame/unadd
Obtain your data from DB to display it on your dashboard | get | user/:idUser
Update your data user | post | user/:idUser/update
Delete your user | post | user/:idUser/delete
Obtain your review | get | review/:idUser/:idGame
Obtain every review of a game | get | review/:idGame/all
Create a review | post | review/:idGame/:idReview/create
Delete your review | post | review/:idReview/delete
Modify your review | post | review/:idReview/update
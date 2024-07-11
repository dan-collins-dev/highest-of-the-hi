"use strict";

const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors");
const port = process.env.PORT || 7000;
const gamesRouter = require("./routes/games");
const scoresRouter = require("./routes/scores")
const coverArtRouter = require("./routes/coverArt")

// Serves the front-end content in the "public" directory
app.use('', express.static(path.join(__dirname, './public')))
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

// Middle-ware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Setting the '/games' endpoint and related router
app.use("/api/games", gamesRouter);

// Setting the '/scores' endpoint and related router
app.use("/api/scores", scoresRouter)

// Setting the '/cover-art' endpoint and related router
app.use("/api/cover-art", coverArtRouter);



// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});

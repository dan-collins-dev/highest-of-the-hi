"use strict";

const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// GET request that returns all games stored
router.get("/", (req, res, next) => {
    gamesController.getAllGames(
        (data) => {
            res.status(200).json({
                status: 200,
                statusMessage: "All games retrieved.",
                data: data,
            });
        },
        (err) => {
            next(err);
        }
    );
});

module.exports = router;

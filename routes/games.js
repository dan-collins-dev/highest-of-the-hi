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
                statusText: "OK",
                statusMessage: "All games retrieved.",
                data: data,
            });
        },
        (err) => {
            next(err);
        }
    );
});

// GET request that gets a single game by id
router.get("/:id", (req, res, next) => {
    gamesController.getGameById(
        req.params.id,
        (data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    statusText: "OK",
                    statusMessage: "Game retrieved.",
                    data: data,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: `Game with id of ${req.params.id} not found`,
                });
            }
        },
        (err) => {
            next(err);
        }
    );
});

// POST request for adding a game
router.post("/", (req, res, next) => {
    gamesController.addGame(
        req.body,
        (data) => {
            res.status(201).json({
                status: 201,
                statusText: "Game Added",
                message: `Game added`,
                data: data,
            });
        },
        (err) => {
            next(err);
        }
    );
});

module.exports = router;

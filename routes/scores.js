"use strict";

const express = require("express");
const router = express.Router();
const scoresController = require("../controllers/scoresController");

// Get scores for a game with ID
router.get("/:id", (req, res, next) => {
    scoresController.getScores(
        req.params.id,
        (data) => {
            if (data) {
                res.status(200).json({
                    status: 200,
                    statusText: "OK",
                    statusMessage: "Scores retrieved.",
                    data: data,
                });
            } else {
                res.status(404).json({
                    status: 404,
                    statusText: "Not Found",
                    message: `Scores with id of ${req.params.id} not found`,
                });
            }
        },
        (err) => {
            next(err);
        }
    );
});

router.post("/:id", (req, res, next) => {
    scoresController.addScore(
        req.body,
        req.params.id,
        (data) => {
            if (data) {
                res.status(201).json({
                    status: 201,
                    statusText: "OK",
                    statusMessage: "New Score Posted.",
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

module.exports = router;

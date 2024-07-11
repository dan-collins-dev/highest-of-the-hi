"use strict";

const express = require("express");
const path = require("path");
const router = express.Router();
const coverArtController = require("../controllers/coverArtController");

// Middle-ware for handling multiforms
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "./uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// GET request that gets a single cover art by id
router.get("/:id", (req, res, next) => {
    coverArtController.getCoverArtById(req.params.id, (data) => {
        if (data) {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                statusMessage: "Art retrieved.",
                data: data,
            });
        } else {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: `Art with id of ${req.params.id} not found`,
            });
        }
    }),
        (err) => {
            next(err);
        };
});

// POST request for adding a game's cover art
router.post("/", upload.single("cover_art"), (req, res, next) => {
    coverArtController.addCoverArt(
        req.file,
        (data) => {
            if (data) {
                res.status(201).json({
                    status: 201,
                    statusText: "Game Art Added",
                    message: `Game Art added`,
                    data: data,
                });
            }
        },
        (err) => {
            next(err);
        }
    );
});

module.exports = router;

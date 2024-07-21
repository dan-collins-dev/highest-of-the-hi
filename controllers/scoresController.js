"use strict";

const { json } = require("express");
const fs = require("fs/promises");
const path = require("path");

// Get scores for a game
const getScores = async (id, resolve, reject) => {
    try {
        // Open the JSON file for the related game
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            `./files/scores/${id}.json`
        );

        // Read the file
        const scoreData = await fs.readFile(FILE_NAME);

        // Resolve the parsed score data
        resolve(JSON.parse(scoreData));
    } catch (error) {
        reject(error);
    }
};

// Add a new score to a game by id
const addScore = async (newScore, id, resolve, reject) => {
    try {
        // Open the scores file
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            `./files/scores/${id}.json`
        );

        // Read the file
        const scoresData = await fs.readFile(FILE_NAME);
        let scores = JSON.parse(scoresData);

        // Assign the game an id and timestamps for created and last
        // modified
        newScore.created_dts = new Date().toUTCString();
        newScore.last_modified_dts = new Date().toUTCString();

        // Add the new score
        scores.push(newScore);

        // Writing the new score list to JSON file
        await fs.writeFile(FILE_NAME, JSON.stringify(scores));

        resolve(newScore);
    } catch (newScore) {
        reject(error);
    }
};

module.exports = { getScores, addScore };

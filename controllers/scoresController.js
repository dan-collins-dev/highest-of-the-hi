"use strict"

const fs = require("fs/promises");
const path = require("path");

// Get scores for a game
const getScores = async (id, resolve, reject) => {
    try {
        // Open the JSON file for the related game
        const FILE_NAME = path.join(path.dirname(__dirname), `./files/scores/${id}.json`);

        // Read the file
        const scoreData = await fs.readFile(FILE_NAME);

        // Resolve the parsed score data
        resolve(JSON.parse(scoreData));
    } catch (error) {
        reject(error);
    }
}

module.exports = { getScores }
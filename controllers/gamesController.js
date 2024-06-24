"use strict";

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Used by GET
const getAllGames = async (resolve, reject) => {
    try {
        // Grab "games.json"
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            "./files/games.json"
        );

        // Read the file
        const gameData = await fs.readFile(FILE_NAME);

        // Resolve with the parsed data
        resolve(JSON.parse(gameData));
    } catch (error) {
        reject(error);
    }
};

const getGameById = async (id, resolve, reject) => {
    try {
        // Grab "games.json"
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            "./files/games.json"
        );

        // Read the file
        const gameData = await fs.readFile(FILE_NAME);

        // Parse the game data and find the game with id that matches
        // the passed "id" parameter
        const game = JSON.parse(gameData).find((g) => g.id === id);

        resolve(game);
    } catch (error) {
        reject(error);
    }
};

module.exports = { getAllGames, getGameById };

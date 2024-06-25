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

const addGame = async (newGame, resolve, reject) => {
    try {
        // Grab "games.json"
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            "./files/games.json"
        );

        // Read the file
        const gameData = await fs.readFile(FILE_NAME);
        const games = JSON.parse(gameData);

        // Assign the game an id and timestamps for created and last
        // modified
        newGame.id = uuidv4();
        newGame.created_dts = new Date().toUTCString();
        newGame.last_modified_dts = new Date().toUTCString();

        // Add the new game to be written to the file
        games.push(newGame);
        await fs.writeFile(FILE_NAME, JSON.stringify(games));

        resolve(newGame);
    } catch (error) {
        reject(error);
    }
};

module.exports = { getAllGames, getGameById, addGame };

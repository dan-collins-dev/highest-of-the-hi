"use strict";

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const getCoverArtById = async (id, resolve, reject) => {
    try {
        // Grab "coverArt.json"
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            "./files/coverArt.json"
        );

        // Read the file
        const coverArtData = await fs.readFile(FILE_NAME);

        // Parse the cover art data and find the art with the id that matches
        // the passed "id" parameter
        const coverArt = JSON.parse(coverArtData).find((a) => a.id === id);

        resolve(coverArt);
    } catch (error) {
        reject(error);
    }
};

const addCoverArt = async (newCoverArt, resolve, reject) => {
    try {
        // Grab "coverArt.json"
        const FILE_NAME = path.join(
            path.dirname(__dirname),
            "./files/coverArt.json"
        );

        // Read the file
        const coverArtData = await fs.readFile(FILE_NAME);
        const coverArt = JSON.parse(coverArtData);

        // Assign the cover art an id and timestamps for created and last
        // modified
        newCoverArt.id = uuidv4();
        newCoverArt.url = `http://localhost:6500/uploads/${newCoverArt.originalname}`;
        newCoverArt.created_dts = new Date().toUTCString();
        newCoverArt.last_modified_dts = new Date().toUTCString();

        // Add the new cover art to be written to the file
        coverArt.push(newCoverArt);
        await fs.writeFile(FILE_NAME, JSON.stringify(coverArt));

        resolve(newCoverArt);
    } catch (error) {
        reject(error);
    }
};

module.exports = { addCoverArt, getCoverArtById };

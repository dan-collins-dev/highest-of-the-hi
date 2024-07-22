"use strict";
const gameFilter = document.getElementById("game-filter");
const allGames = [];
const allCoverArt = [];

// Makes a GET request that returns all games
const getGames = async () => {
    try {
        const response = await fetch("http://localhost:6500/api/games");
        let games = await response.json();
        let gamesObj = Array.from(games.data);
        gamesObj.forEach((game) => {
            allGames.push(game);
        });

        renderGamesList();
    } catch (error) {
        console.log(error);
    }
};

// create game card
const createCard = async (gameEntry) => {
    const gamesList = document.getElementById("games");

    const card = document.createElement("article");
    card.classList.add("games__card");
    gamesList.appendChild(card);

    const artWrapper = document.createElement("div");
    artWrapper.classList.add("games__cover-art-wrapper")
    card.appendChild(artWrapper)

    const coverArt = document.createElement("img")
    coverArt.classList.add("games__cover-art")
    coverArt.src = gameEntry.cover_art
    coverArt.alt = `Cover art for ${gameEntry.name}`
    artWrapper.appendChild(coverArt)

    const name = document.createElement("h3");
    name.classList.add("games__game-name");
    name.innerHTML = `<a href="./scores.html?id=${gameEntry.id}&name=${gameEntry.name}">${gameEntry.name}</a>`;
    card.appendChild(name);

    const devName = document.createElement("p");
    devName.classList.add("games__game-developer");
    devName.innerHTML = `${gameEntry.dev_name}`;
    card.appendChild(devName);
};

// Render all the game cards
const renderGamesList = async () => {
    allGames.forEach((game) => {
        createCard(game);
    });
};

const filterGames = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const gameList = document.getElementById("games");
    let games = Array.from(gameList.children);

    games.forEach((game) => {
        game.classList.remove("hidden");

        if (!game.innerText.toLowerCase().includes(searchTerm)) {
            game.classList.toggle("hidden");
        }
    });
};

gameFilter.addEventListener("input", filterGames);

getGames();

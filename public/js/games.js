"use strict"

const allGames = []

// Makes a GET request that returns all games
const getGames = async () => {
    const response = await fetch("http://localhost:6500/api/games");
    let games = await response.json();

    let gamesObj = Array.from(games.data);
    gamesObj.forEach((game) => {
        allGames.push(game);
    });

    renderGamesList()
};

// create game card
const createCard = (gameEntry) => {
    const gamesList = document.getElementById("games")
    
    const card = document.createElement("article");
    card.classList.add("games__card")
    gamesList.appendChild(card)
    
    const name = document.createElement("h3");
    name.classList.add("games__game-name");
    name.innerHTML = `${gameEntry.name}`
    card.appendChild(name)
    
    const devName = document.createElement("p")
    devName.classList.add("games__game-developer")  
    devName.innerHTML = `${gameEntry.dev_name}`
    card.appendChild(devName)
}

// Render all the game cards
const renderGamesList = async () => {
    allGames.forEach(game => {
        createCard(game)
    })
}

getGames();
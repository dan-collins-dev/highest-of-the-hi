"use strict";

const allScores = [];

// Makes a GET request that returns all scores
// related to the passed in ID
const getScores = async (id) => {
    try {
        const response = await fetch(`http://localhost:6500/api/scores/${id}`);
        let scores = await response.json();
        let scoresObj = Array.from(scores.data);

        // Sorts the scores from highest to lowest
        scoresObj.sort((a, b) => b.score - a.score);

        scoresObj.forEach((score) => {
            allScores.push(score);
        });

        renderScoresList();
    } catch (error) {
        console.log(error);
    }
};

const renderScoresList = async () => {
    allScores.forEach((score, index) => {
        createCard(score, index);
    });
};

const createCard = (scoreEntry, index) => {
    const scoresList = document.getElementById("scores");

    const card = document.createElement("article");
    card.classList.add("scores__card");
    scoresList.appendChild(card);

    const rank = document.createElement("p");
    rank.classList.add("scores__rank");
    rank.innerHTML = `Rank: ${index + 1}`;
    card.appendChild(rank);

    const name = document.createElement("p");
    name.classList.add("scores__player-name");
    name.innerHTML = `${scoreEntry.player_name}`;
    card.appendChild(name);

    const score = document.createElement("p");
    score.classList.add("scores__score");
    score.innerHTML = `${scoreEntry.score}`;
    card.appendChild(score);
};

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

getScores(id);

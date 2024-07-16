"use strict"

const submitBtn = document.getElementById("submission-btn");
const nameInput = document.getElementById("game-name")
const devInput = document.getElementById("dev-name")
const preview = document.getElementById("uploadPreview");
const uploadInput = document.getElementById("uploadInput")
const dialog = document.querySelector("dialog")
const closeBtn = document.getElementById("closeBtn")

closeBtn.addEventListener("click", () => {
    dialog.close()
})


uploadInput.addEventListener("change", (e) => {
    if (uploadInput.files[0] !== undefined) {
        preview.src = URL.createObjectURL(e.target.files[0])
    } else {
        preview.src = "../images/defaultCoverArt.png"
    }
})


submitBtn.addEventListener("click", async e => {
    e.preventDefault();

    // Manual check to see if all fields and cover photo have been populated
    if (nameInput.value === "" || devInput.value === "" || uploadInput.files[0] === undefined) {
        dialog.showModal();
        return;
    }

    const form = document.getElementById("submit-form")
    const formData = new FormData(form)

    const coverArtData = new FormData();
    coverArtData.set("cover_art", formData.get("cover_art"))

    console.log(formData.get("cover_art"))

    const coverArtRes = await fetch("http://localhost:6500/api/cover-art", {
        method: "POST",
        body: coverArtData
    })

    let coverArtResData = await coverArtRes.json()

    const game = {
        "name": formData.get("name"),
        "dev_name": formData.get("dev_name"),
        "cover_art": `${coverArtResData.data.url}`
    }

    const gameRes = await fetch("http://localhost:6500/api/games", {
        method: "POST",
        body: JSON.stringify(game),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    let gameResData = await gameRes.json();
    console.log(gameResData);
})
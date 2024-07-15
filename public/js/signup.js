"use strict"

const btn = document.querySelector("button");
const nameInput = document.getElementById("game-name")
const devInput = document.getElementById("dev-name")
const preview = document.getElementById("uploadPreview");
const uploadInput = document.getElementById("uploadInput")


uploadInput.addEventListener("change", (e) => {
    preview.src = URL.createObjectURL(e.target.files[0])
})


btn.addEventListener("click", async e => {
    e.preventDefault();

    const form = document.getElementById("submit-form")
    const formData = new FormData(form)

    const coverArtData = new FormData();
    coverArtData.set("cover_art", formData.get("cover_art"))

    console.log(formData.get("cover_art"))

    const coverArtRes = await fetch("http://localhost:6500/api/cover-art", {
        method: "POST",
        body: coverArtData
    })
    // console.log(res)
    // console.log(baseUrl)
    let coverArtResData = await coverArtRes.json()
    // console.log(resData.data)
    
    // was using during testing
    // preview.src = coverArtResData.data.url

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


const express = require("express")
const app = express();
const port = 5000;

app.use(express.static("./public"))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    console.log("Press Ctrl+C to end this process.")
})
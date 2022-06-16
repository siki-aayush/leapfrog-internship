const path = require("path");
const express = require("express");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const app = express();
const liveReloadServer = livereload.createServer();

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(connectLiveReload());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(3000, () => {
    console.log("Application listening on port 3000!");
});

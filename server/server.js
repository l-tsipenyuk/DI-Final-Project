const db = require("./config/db.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const cards_router = require("./routes/cards.routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/",express.static(__dirname + '/public'));
app.use("/api/cards", cards_router);

app.listen( 3001, () => {
    console.log(`running on port 3001`);
});
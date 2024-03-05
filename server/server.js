const express = require("express");
const cors = require("cors");

const colors = require('colors');

const app = express();
app.use(cors());

app.listen(3000, () => console.log("Server is up...".rainbow.bold.italic))
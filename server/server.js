const express = require("express");
const cors = require("cors");

const colors = require('colors');

const app = express();





app.use(cors());
app.use(express.json()); ///LADE TILL DETTA

app.post( "/api/users")



app.listen(3000, () => console.log("Server is up...".blue + 
"Follow this link for page: http://localhost:3000/".rainbow.bold.italic))
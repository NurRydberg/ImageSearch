const express = require("express");
const cors = require("cors");

const colors = require('colors');

const app = express();



const snus = [
    { id: 1, name: "General", strength: 1, price: 50 },
    { id: 2, name: "Ettan", strength: 2, price: 60 },
    { id: 3, name: "Skruf", strength: 3, price: 70 }
];



app.use(cors());
app.use(express.json()); ///LADE TILL DETTA

app.post( "/api/users")



app.listen(3000, () => console.log("Server is up...".blue + 
"Follow this link for page: http://localhost:3000/".rainbow.bold.italic))
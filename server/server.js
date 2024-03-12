const express = require("express");
const cors = require("cors");
const colors = require('colors');
const fs = require('fs');
const { log } = require("console");

const app = express();


app.use(cors());
app.use(express.json()); ///LADE TILL DETTA


// Anrop fungerar
app.post ("/users", (req, res) => {
        console.log(req.body);
        const dataJsonfile = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

        const userExists = dataJsonfile.find((user) => user.email === req.body.email);

        if (userExists) {
            userExists.favoriteImage = req.body.favoriteImage;
            fs.writeFileSync("./users.json", JSON.stringify(dataJsonfile, null, 2));
            res.status(200).json("Favorite image added to existing user");
        } else {
            dataJsonfile.push(req.body);
            fs.writeFileSync("./users.json", JSON.stringify(dataJsonfile, null, 2));
            res.status(201).json("User added with favorite image");
        }

        // Finns användaren redan? Då vill vi lägga till hjärtad bild till den användaren. 
        //Om användaren inte finns, spara användaren och bilden i en array
        dataJsonfile.users.push(req.body);
        
        fs.writeFileSync("./users.json", JSON.stringify(dataJsonfile, null, 2));
        res.status(201).json("User added");
});
    
        
    
    
    app.get("/users/:id", (req, res) => {
        res.send("Varsågod, här kommer användare med id" + req.params.id)
    });
    
    


    app.listen(3000, () => console.log("Server is up...".blue + 
    "Follow this link for page: http://localhost:3000/".rainbow.bold.italic))


    
    
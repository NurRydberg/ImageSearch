const express = require("express");
const cors = require("cors");
const colors = require('colors');
const fs = require('fs');
const { log } = require("console");
const { registerSchema } = require("./schemas/user.schema");
const { validate } = require("./validate");

const app = express();


app.use(cors());
app.use(express.json()); 

app.post ("/users", validate(registerSchema), (req, res) => {
        const {error} = registerSchema.validate(req.body, {abortEarly: false});
        if (error) {
            return res.status(400).json(error)
        }

        const dataJsonfile = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
        const userExists = dataJsonfile.find((user) => user.email === req.body.email);

        if (userExists) {
            userExists.favoriteImages.push(req.body.image)

        } else {
            dataJsonfile.push({
                email: req.body.email,
                favoriteImages: [req.body.image]
            });
        }
        
        fs.writeFileSync("./users.json", JSON.stringify(dataJsonfile, null, 2));

        res.status(201).json("User added");
});
    
        
    app.get("/users/:email/favoriteImages", (req, res) => {
        const dataJsonfile = JSON.parse(fs.readFileSync("./users.json", "utf-8")); 
        const userEmail = req.params.email;

        const user = dataJsonfile.find((user) => user.email === userEmail);

        if (user) {
            res.json(user.favoriteImages);
        }else{
            res.status(404).json({ error: "User not found"});
        }


        res.send("Varsågod, här kommer användare med id" + req.params.email);
    });
    
    


    app.listen(3000, () => console.log("Server is up...".blue + 
    "Follow this link for page: http://localhost:3000/".rainbow.bold.italic))


    
    
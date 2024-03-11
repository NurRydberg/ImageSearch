const express = require("express");
const cors = require("cors");
const colors = require('colors');
const fs = require('fs');
const { log } = require("console");

const app = express();


app.use(cors());
app.use(express.json()); ///LADE TILL DETTA

console.log("hej", fs.readFileSync("./users.json", "utf-8"));

// Anrop fungerar
app.post ("/users", (req, res) => {
        console.log(req.body);
        res.send("User created");
        const dataJsonfile = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
        res.send(console.log(dataJsonfile));
        dataJsonfile.users.push(req.body);

        fs.writeFileSync("./users.json", JSON.stringify(dataJsonfile));

    })
    
    app.get("/users/:id", (req, res) => {
        res.send("Varsågod, här kommer användare med id" + req.params.id)
    });
    
  


    app.listen(3000, () => console.log("Server is up...".blue + 
    "Follow this link for page: http://localhost:3000/".rainbow.bold.italic))
    
    
    // const user = {
        //     user: "username",
        //     favoriteImage: "imageURL",
        //     password: "password",
        //     email: "email",
        // }
        
        // const fs = require('fs');
        // const { finished } = require("stream");
        
        // const saveData = (userinformation) => {
            //     const finished = (error) => {
                //         if(error){
                    //             console.error(error);
//             return;
//         }
//     }

//    const jsonData = JSON.stringify(userinformation, null, 2);
//     fs.writeFileSync('users.json', jsonData, finished)
// }

// saveData(user);

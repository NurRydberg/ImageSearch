const express = require("express");
const cors = require("cors");
const colors = require('colors');

const app = express();


app.use(cors());
app.use(express.json()); ///LADE TILL DETTA



// Anrop fungerar
// app.post ("/user", (req, res) => {
    //     console.log(req.body);
    //     res.send("User created");
    // }
    
    app.get("/user/:id", (req, res) => {
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

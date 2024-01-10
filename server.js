// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1/miniProject3")
const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());



let dbConnect = require("./dbconnect"); // COMMENTED OUT BEFORE
let Models =require("./models");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

let userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes)


async function initialiseDb() {
    
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts")
    const response = await posts.json()
    for(let i=0; i<response.length; i++) {

     const post = new Models.User ({
        userID: response[i]['userId'],
        id: response[i]['id'],
        title: response[i]['title'],
        description: response[i]['body']

      })
       post.save();
    }

}
    
    
initialiseDb();
console.log('db initialised')
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
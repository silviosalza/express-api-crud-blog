const express = require('express');
const dotenv = require('dotenv');
const postController = require("./controllers/postController")
const homeController = require("./controllers/homeController")

dotenv.config();

//creo istanza express
const app = express();

//configuro file statici con nome cartella
app.use(express.static("public"));

app.get("/" , homeController.index);

app.get("/posts" , postController.index)

app.listen(process.env.PORT || 3000 , () =>{
    console.log(`http://localhost:${process.env.PORT}`)
});
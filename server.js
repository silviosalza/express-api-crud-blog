const express = require('express');
const dotenv = require('dotenv');
const homeController = require("./controllers/homeController")
const postRouter = require("./routers/postRouter");
const errorFormatterMiddleware = require('./middlewares/errorFormatter');
const routesLoggerMiddleware = require('./middlewares/routesLogger');
const routeNotFoundMiddleware = require('./middlewares/routeNotFound');
const adminRouter = require("./routers/adminRouter")


dotenv.config();

//creo istanza express
const app = express();

//configuro file statici con nome cartella
app.use(express.static("public"));

//registro il tipo di bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//middleware delle rotte
app.use(routesLoggerMiddleware)

app.get("/" , homeController.index);
//uso rotte importate dal file postRouter
app.use("/posts" , postRouter)
app.use("/admin" , adminRouter)

//gestione errori sempre all'ultimo
app.use(routeNotFoundMiddleware)
app.use(errorFormatterMiddleware)


app.listen(process.env.PORT || 3000 , () =>{
    console.log(`http://localhost:${process.env.PORT}`)
});
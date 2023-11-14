const express = require("express");
const router = express.Router();
const multer = require("multer")
const postController = require("../controllers/postController")

// funzione index

router.get("/" , postController.index)

//funzione create
router.get("/create" , postController.create)
router.post("/", multer().none() , postController.store)

//funzione show
router.get("/:slug", postController.show)

//funzione download

router.get("/:slug/download" , postController.downloadImg)



module.exports = router;
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController")

// funzione index

router.get("/" , postController.index)

//funzione show

router.get("/:id", postController.show)

module.exports = router;
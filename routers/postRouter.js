const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController")

// funzione index

router.get("/" , postController.index)

//funzione create
router.get("/create" , postController.create)

//funzione show
router.get("/:slug", postController.show)



module.exports = router;
const express = require("express");
const movieController = require("../controllers/movieController")

const router = express.Router();

router.route("/").get(movieController.allMovie);
router.route("/addMovie").get(movieController.addMovie);
router.route("/addVideo").get(movieController.addVideo);


module.exports = router;
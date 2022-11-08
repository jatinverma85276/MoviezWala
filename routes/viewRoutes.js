const viewController = require("./../controllers/viewController");
const express = require("express");
const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/movie/:slug", viewController.getMovie);
router.get("/genre/:genre",viewController.getAllMovie);
router.get("/browse/:browse", viewController.browseMovie)
router.get("/search", viewController.search)


module.exports = router;
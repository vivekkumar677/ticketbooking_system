const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

router.post("/", showController.createShow);
router.get("/", showController.getAllShows);    
router.get("/:id", showController.getShowById);

module.exports = router;
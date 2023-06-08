const express = require('express');
const router = express.Router();

//http://localhost:3000/sketch
router.route("/sketch")
    .post((req,res,next) => sketchController.sketchSave(req,res,next))
    .put((req,res,next) => sketchController.sketchUpdate(req,res,next));

module.exports = router;
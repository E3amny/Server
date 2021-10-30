const express = require("express");

const {getAllHospitals} = require("../controllers/helpSpecific");

const helpSpecificRouter = express.Router();

helpSpecificRouter.get("/", getAllHospitals);
//  [get]  [http://localhost:5000/helpSpecific]
/* -----------------------------------------  */

module.exports = helpSpecificRouter;


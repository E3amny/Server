const express = require("express");
const { stripePayment } = require("../../controllers/Services/stripe");

//Define Router
const stripeRouter = express.Router();


stripeRouter.post('/', stripePayment);



module.exports = stripeRouter;
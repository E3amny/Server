const express = require("express");
const register = require("../../controllers/auth/signup");

// define router
const signupRouter = express.Router();

// 			routes
//post  http://localhost:5000/signup

signupRouter.post("/", register);

module.exports = signupRouter;

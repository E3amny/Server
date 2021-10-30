const express = require("express");
const login = require("../../controllers/auth/login");

// define router
const loginRouter = express.Router();

// 			routes
//post  http://localhost:5000/login/

loginRouter.post("/", login);

module.exports = loginRouter;

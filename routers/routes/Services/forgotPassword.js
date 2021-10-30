const express = require("express");
const {sendEmail} = require("../../controllers/Services/forgotPassword");
const forgetPasswordRouter = express.Router();
forgetPasswordRouter.post("/", sendEmail);
//  [get]  [http://localhost:5000/forgetPassword] */
module.exports = forgetPasswordRouter;
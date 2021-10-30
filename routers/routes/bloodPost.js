const express = require("express");
const { createNewBloodPost, getAllBloodPost, deleteTheBloodPost , updateBloodPost } = require("../controllers/bloodPost");

//Define Router
const bloodpostRouter = express.Router();

// middlewares
const authentication = require("../middlewares/authentication")

//Routes
bloodpostRouter.post('/createBloodPost/createBloodPost',authentication, createNewBloodPost);
bloodpostRouter.get('/', getAllBloodPost);
bloodpostRouter.put('/:id', deleteTheBloodPost);
bloodpostRouter.put("/update/:id" , updateBloodPost)
//update
//delete


module.exports = bloodpostRouter;
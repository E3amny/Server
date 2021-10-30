const express = require("express");
const { searchForCampaigns } = require("../../controllers/Services/search")
const { updateUserById,GetUserById } = require ("./../../controllers/Services/accountSettings")
const authentication = require('../../middlewares/authentication')

const searchRouter = express.Router();

searchRouter.get('/', searchForCampaigns);
searchRouter.put('/AccountSettings/update/:id', authentication,updateUserById);
searchRouter.get('/GetUserById/:id', authentication,GetUserById);



module.exports = searchRouter;
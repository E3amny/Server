const express = require("express");

const { createNewContribution, getOwnUserContributionsById, getContributorsByCampaignId, getAllContributorsByCampaignId } = require("../controllers/Contribution");


// define router
const ContributionRouter = express.Router();

// middlewares
const authentication = require("../middlewares/authentication")

// //Routes
ContributionRouter.get('/contributors/:id', getContributorsByCampaignId)
ContributionRouter.post('/', createNewContribution);
ContributionRouter.get('/:id', authentication, getOwnUserContributionsById)
ContributionRouter.get('/allcontribution/:id', getAllContributorsByCampaignId)


module.exports = ContributionRouter;
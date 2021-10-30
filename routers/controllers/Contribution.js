const connection = require("../../db/db");

const createNewContribution = (req, res) => {
    const { user_id, campaign_id, category_id, created_at, amount } = req.body;
    const addNewContribution = `INSERT INTO  contributions (user_id , campaign_id, category_id, created_at, amount) VALUES (?,?,?,?,?)`;

    const data = [user_id, campaign_id, category_id, created_at, amount];

    connection.query(addNewContribution, data, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: "Server Error",
                err: err,
            };
            res.status(500).json(error);
        }
        if (result) {
            const success = {
                success: true,
                message: "success insert one record",
            };
            res.status(200).json(success);
        }
    });
};

const getOwnUserContributionsById = (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM contributions WHERE userId = ${userId}`;

    connection.query(query, (err, result) => {
        if (result) {
            return res.status(200).json({
                success: true,
                message: `User with the following id => ${userId} has the following contributions`,
                result: result,
            });
        }
        if (err) {
            return res.status(404).json({
                success: false,
                message: `No contributions found for this user with the following id ==> ${userId}`,
                err: err,
            });
        } else {
            return res.status(500).json({
                success: false,
                message: `Server Error`,
            });
        }
    });
};

const getContributorsByCampaignId = (req, res) => {
    const campaign_id = req.params.id;
    const query = `SELECT * FROM users JOIN contributions  ON users.id=contributions.userId WHERE contributions.campaign_id = ${campaign_id} LIMIT 4`;

    connection.query(query, (err, result) => {
        if (result) {
            return res.status(200).json({
                success: true,
                message: `Users that contributed for this campaign => ${campaign_id}`,
                result: result,
            });
        }
        if (err) {
            return res.status(404).json({
                success: false,
                message: `No contributions found for this campaign with the following campaign_id ==> ${campaign_id}`,
                err: err,
            });
        } else {
            res.status(500).json({
                success: false,
                message: `Server Error`,
            });
        }
    });
};


const getAllContributorsByCampaignId = (req, res) => {
    const campaign_id = req.params.id;
    const query = `SELECT * FROM users JOIN contributions  ON users.id=contributions.userId WHERE contributions.campaign_id = ${campaign_id}`;

    connection.query(query, (err, result) => {
        if (result) {
            return res.status(200).json({
                success: true,
                message: `Users that contributed for this campaign => ${campaign_id}`,
                result: result,
            });
        }
        if (err) {
            return res.status(404).json({
                success: false,
                message: `No contributions found for this campaign with the following campaign_id ==> ${campaign_id}`,
                err: err,
            });
        } else {
            res.status(500).json({
                success: false,
                message: `Server Error`,
            });
        }
    });
};

module.exports = {
    createNewContribution,
    getOwnUserContributionsById,
    getContributorsByCampaignId,
    getAllContributorsByCampaignId,
};
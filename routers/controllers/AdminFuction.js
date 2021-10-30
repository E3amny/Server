///const
const { re } = require("nodemon/node_modules/semver");
const connection = require("../../db/db");

//// Get All users

const GetAllUser = (req, res) => {
    const query = `SELECT * FROM users`;
    connection.query(query, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: "Somthing Error Try Again",
                err: err,
            };
            res.status(500).json(error);
        }
        if (result) {
            const success = {
                success: true,
                message: "All users ",
                result: result,
            };
            res.status(200).json(success);
        }
    });
};

// get all Fundraiser

const GetAllFundraiser = (req, res) => {
    const query = `SELECT * FROM campaigns`;
    connection.query(query, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: err,
            };
            res.status(500).json(error);
        }
        if (result) {
            const success = {
                success: true,
                message: "All Fundraiser",
                Fundraisers: result,
            };
            res.status(200).json(success);
        }
    });
};

/// get all Fundraisers pending
const GetAllPendingPost = (req, res) => {
    const query = `SELECT * FROM campaigns where is_deleted = 0`;
    connection.query(query, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: "There's no Fundraiser is pending",
            };
            res.status(500).json(error);
        }
        if (result) {
            const success = {
                success: true,
                message: "All Fundraiser is pending",
                Fundraiser: result,
            };
            res.status(200).json(success);
        }
    });
};

// / Delete Fundraisers

const deleteFundraisers = (req, res) => {
    id = req.params.id;
    const select = `SELECT * FROM campaigns where id = ${id}`;
    connection.query(select, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: `your ${id} is not Found`,
            };
            res.status(500).json(error);
        }
        if (result.length) {
            const deleteid = `UPDATE campaigns SET is_deleted = 2  WHERE id = ${id}`;
            connection.query(deleteid, (err, response) => {
                if (err) {
                    res.status(404).json(err);
                }
                if (response) {
                    const success = {
                        success: true,
                        message: "success updated post to is deleted",
                    };
                    res.status(200).json(success);
                }
            });
        } else {
            res.json(`Your ${id} is not Found`);
        }
    });
};

// Accept The Fundraiser 0 - 1
const AcceptFundraisers = (req, res) => {
    const id = req.params.id;
    const select = `SELECT * FROM campaigns where id = ${id}`;
    connection.query(select, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: `Your id ===> ${id} is not Found`,
            };
            res.status(500).json(error);
        }
        if (result.length) {
            const updateRow = `UPDATE campaigns SET is_deleted = 1  WHERE id = ${id}`;
            connection.query(updateRow, (err, response) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server Error",
                    });
                }
                if (response) {
                    res.status(200).json({
                        success: true,
                        message: "success change the post from pending to accept",
                    });
                }
            });
        } else {
            res.json(`Your ${id} is not Found`);
        }
    });
};

///reject the fundraiser
const rejectedTheFunders = (req, res) => {

    const id = req.params.id;
    const select = `SELECT * FROM campaigns where id = ${id}`;
    connection.query(select, (err, response) => {
        if (err) {
            const error = {
                success: false,
                message: "Server Error",
            };
            res.status(500).json(error);
        }
        if (response.length) {
            const reject = `UPDATE campaigns SET is_deleted = 2  WHERE id = ${id}`;
            connection.query(reject, (err, response) => {

                if (err) {
                    res.status(500).modulejson({
                        success: false,
                        message: "Server Error",
                    });
                }
                if (response) {
                    res.status(200).json({
                        success: true,
                        message: "success updated fundraiser to rejected",
                    });
                }
            });
        } else {
            res.json(`your ${id} is not found`);
        }
    });
};

//Create New story

const createNewStory = (req, res) => {
    const { namee, descriptionn, img } = req.body;
    const addNewRow = `INSERT INTO story (namee , descriptionn , img) VALUES (?,?,?)`;
    const data = [namee, descriptionn, img];
    connection.query(addNewRow, data, (err, response) => {
        if (err) {
            const error = {
                success: false,
                message: "something error",
                erorr: err,
            };
            res.status(500).json(error);
        }
        if (response) {
            const success = {
                success: true,
                message: "One row effect ",
            };
            res.status(200).json(success);
        }
    });
};

//Get All Stroy

const getAllStroy = (req, res) => {
    const allStory = `SELECT * FROM story`;
    connection.query(allStory, (err, response) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "SERVER ERROR",
            });
        }
        if (response) {
            res.status(200).json({
                success: true,
                message: "All Data",
                allData: response,
            });
        }
    });
};

/// update the stroy

const updateStroy = (req, res) => {
    const id = req.params.id;
    const { namee, descriptionn, img } = req.body;
    const selectQuery = `SELECT * from story WHERE id = ${id}`;
    connection.query(selectQuery, (err, response) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "Server Error",
            });
        }
        if (response.length) {
            const update = `UPDATE story SET namee="${namee}", descriptionn="${descriptionn}" , img="${img}" WHERE id = ${id}`;
            connection.query(update, (err, response) => {
                const success = {
                    success: true,
                    message: "One row updated ",
                    result: response,
                };
                res.status(200).json(success);
            });
        } else {
            const error = {
                success: false,
                message: `the id ${id} is not Found`,
            };
            res.status(500).json(error);
        }
    });
};

/// Delete a stroy

const deleteStroy = (req, res) => {
    const id = req.params.id;
    const deleteRow = `SELECT * From story where id = ${id}`;
    connection.query(deleteRow, (err, response) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
            });
        }
        if (response.length) {
            const softDelete = `UPDATE story SET is_deleted = 0 where id = ${id}`;
            connection.query(softDelete, (err, response) => {
                res.status(200).json({
                    success: true,
                    message: "success convert this stroy to archives ",
                });
            });
        } else {
            res.status(500).json({
                success: false,
                message: `id ${id} is not Found`,
            });
        }
    });
};

/*** */

const ConvertToPending = (req, res) => {
    const id = req.params.id;
    const select = `SELECT * FROM campaigns where id = ${id}`;
    connection.query(select, (err, result) => {
        if (err) {
            const error = {
                success: false,
                message: `Your id ===> ${id} is not Found`,
            };
            res.status(500).json(error);
        }
        if (result.length) {
            const updateRow = `UPDATE campaigns SET is_deleted = 0  WHERE id = ${id}`;
            connection.query(updateRow, (err, response) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Server Error",
                    });
                }
                if (response) {
                    res.status(200).json({
                        success: true,
                        message: "success change the post from pending to accept",
                    });
                }
            });
        } else {
            res.json(`Your ${id} is not Found`);
        }
    });
};


const getAllFundraiserInDashbord = (req, res) => {
    //need testing
    let id = req.params.id;
    const query = `SELECT * FROM campaigns WHERE id = ${id}`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res.status(200).json({
            success: true,
            message: `All the fund raisers of type: ${id}`,
            result: result,
        });
    });
};
module.exports = {
    GetAllUser,
    GetAllFundraiser,
    GetAllPendingPost,
    deleteFundraisers,
    AcceptFundraisers,
    rejectedTheFunders,
    createNewStory,
    updateStroy,
    deleteStroy,
    getAllStroy,
    ConvertToPending,
    getAllFundraiserInDashbord,
};
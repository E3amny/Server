const connection = require("../../db/db");

const createNewBloodPost = (req, res) => {
  const { title, descriptionn, img, userId } = req.body;
  const queryString = `INSERT INTO  bloodpost (title , descriptionn, img, userId ) VALUES (?,?,?,?)`;
  const data = [title, descriptionn, img, userId];
  connection.query(queryString, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: ` Success bloodpost created`,
        bloodpost: result,
      });
    }
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  });
};

/// get all bloodBank
const getAllBloodPost = (req, res) => {
  const bloodBank = "SELECT * FROM bloodpost";
  connection.query(bloodBank, (err, result) => {
    if (err) {
      const error = {
        success: false,
        message: "SERVER ERROR",
        error: err,
      };
      res.status(500).json(error);
    }
    if (result) {
      const success = {
        success: true,
        message: "All The Blood ",
        Data: result,
      };
      res.status(200).json(success);
    }
  });
};

/// delete the bloodpost

const deleteTheBloodPost = (req, res) => {
  const id = req.params.id;
  const selectPost = `SELECT * FROM bloodpost WHERE id =${id}`;
  connection.query(selectPost, (err, response) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "something error",
        error: err,
      });
    }
    if (response.length) {
      const deletePost = `UPDATE bloodpost SET is_deleted = 2 where id = ${id}`;
      connection.query(deletePost, (err, response) => {
        if (response) {
          res.status(200).json({
            success: true,
            message: "success updated row",
          });
        }
        if (err) {
          res.status(500).json({
            success: false,
            message: "ERRROR",
            error: err,
          });
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: `The id you was enterd ${id} is not Found`,
      });
    }
  });
};

const updateBloodPost = (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;
  const queryString = `UPDATE bloodpost SET title = ${title} , description = ${description} where id = ${id}`;
  const data = [title, description];
  connection.query(queryString, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: ` Success bloodpost update`,
        bloodpost: result,
      });
    }
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  });
};
module.exports = {
  createNewBloodPost,
  getAllBloodPost,
  deleteTheBloodPost,
  updateBloodPost,
};

const connection = require("../../db/db");

//Get all hospital
const getAllHospitals = (req, res) => {
  const query = `SELECT * FROM hospitaltable LIMIT 5`;
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error,
      });
    }
    res
      .status(200)
      .json({ success: true, message: `All Hospitals`, result: result });
  });
};

module.exports = { getAllHospitals };

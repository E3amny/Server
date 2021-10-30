const connection = require("../../../db/db")

const searchForCampaigns = (req, res) => {
  const searchTitle = req.query.name
  const query = `SELECT * FROM campaigns WHERE title LIKE "%${searchTitle}%" AND is_deleted=1`;

  connection.query(query, (error, result) => {
    if (result) {
      res.status(200).json({
        success: true,
        search: result
      });
      return
    }
    if (error) {
      res.status(400).json({
        success: false,
        message: "campaign title doesn't exist"
      });
      return
    } else {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error
      });
      return
    }
  });
};

module.exports = {searchForCampaigns}
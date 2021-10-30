const connection = require("../../../db/db");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  let { firstName, lastName, img, age, email, passwordd, country } = req.body;
  let passwordHash = await bcrypt.hash(passwordd, 10);

  let data = [firstName, lastName, age, img, email, passwordHash, country];
  let query = `INSERT INTO users (firstName,lastName,age,img,email,passwordd,country) VALUES(?,?,?,?,?,?,?)`;

  connection.query(query, data, (error, result) => {
    if (result) {
      return res.status(200).json(result);
    }
    if (error) {
      return res.status(409).json({
        success: false,
        message: `Duplicate Email Found`,
        error: error,
      });
    }
  });
};

module.exports = register;

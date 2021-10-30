const connection = require("../../../db/db");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const sendEmail = async (req, res) => {
  const password = Math.floor(Math.random() * 100000000).toString();

  const passwordHash = await bcrypt.hash(password, 10);

  const { email } = req.body;
  const sgMailApiKey =
    "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";
  const querySelect = `SELECT * FROM users WHERE email="${email}"`;

  connection.query(querySelect, (error, result) => {
    if (result) {
      const data = [passwordHash];
      const queryUpdate = `UPDATE users SET passwordd=? WHERE email="${email}"`;
      if (error) {
        res.status(500).json({
          success: false,
          message: `Error happened during query for the fundraiser`,
          error: error,
        });
      }
      connection.query(queryUpdate, data, (error, resultRRR) => {
        if (resultRRR) {
          res.status(200).json({
            success: true,
            message: `Success, updated the  passwordd => ${passwordHash}`,
            resultRRR: resultRRR,
          });
          sgMail.setApiKey(sgMailApiKey);
          const msg = {
            to: { email }, // Change to your recipient
            from: "obada.amarneh20@gmail.com", // Change to your verified sender
            subject: "Sending with SendGrid is Fun",
            text: `your a New password ${password}  `,
            html: `<strong> <hr><hr/> <h1>  your a New password  ${password}  </h1> <hr><hr/> `,
          };
          sgMail
            .send(msg)
            .then(() => {})
            .catch((error) => {});
        } else {
          res.status(404).json({
            success: false,
            message: `Email Not Found => ${email}`,
          });
        }
        if (error) {
          res.status(500).json({
            success: false,
            message: `Server error`,
          });
        }
      });
    }
  });
};
module.exports = { sendEmail };

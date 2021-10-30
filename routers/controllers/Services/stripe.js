const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const connection = require("../../../db/db");
const socket = require("socket.io");
const io = require("../../../server");

const stripePayment = async (req, res) => {
  const { amount, id, campaign_id, userId, created_at, title } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Fundraiser",
      payment_method: id,
      confirm: true,
    });

    if (payment.status == "succeeded") {
      const queryString = `INSERT INTO  contributions (userId , campaign_id, amount, created_at, title  ) VALUES (?,?,?,?,?)`;
      const data = [userId, campaign_id, amount, created_at, title];
      connection.query(queryString, data, (err, result) => {
        if (result) {
          const query = `SELECT current_target,targett,userId,title FROM campaigns WHERE id=${campaign_id}`;
          connection.query(query, (err, result1) => {
            let updatedAmount = result1[0].current_target + amount / 100;
            const query = `UPDATE campaigns SET current_target = ${updatedAmount}  WHERE id = ${campaign_id}`;
            connection.query(query, (err, response) => {
              if (err) {
                res.status(500);
                res.json(err);
              }
              if (response) {
                const success = {
                  success: true,
                  message:
                    "success amount post to is updated and payment successfully",
                  result: response,
                };
                res.json(success);
                res.status(200);
              }
              if (result1[0].current_target >= result1[0].targett) {
                const io = req.app.get("socketio"); // importing the socket instance

                io.emit("notificationtarget", {
                  text: `Congratulations, your ${result1[0].title} has reached its target!`,
                  owner: result1[0].userId,
                });
              }
            });
          });
        }
        if (err) {
          res.json({
            message: "Payment failed",
            success: false,
          });
        }
      });
    }
  } catch (error) {
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};
module.exports = { stripePayment };
// module.exports = {postInformationSender}

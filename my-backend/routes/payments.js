const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const requireAuth = require("../middleware/auth");

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_RBAanpXD67sutR",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "2GJwFGLDL6Z9E0tOAw5S1uMa",
});

router.post("/order", requireAuth, async (req, res) => {
  try {
    const { amount } = req.body; // in rupees
    const order = await razor.orders.create({ amount: Number(amount) * 100, currency: "INR" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Payment error" });
  }
});

module.exports = router;



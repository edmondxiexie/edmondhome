import express from "express";
import axios from "axios";
import Stripe from "stripe";

let router = express.Router();

router.post("/", (req, res) => {
  console.log("******POST api/pay PASS!!******");
  const token = req.body.id;
  const amount = Number(req.body.price) * 100;

  console.log("id", req.body.id);
  console.log("price", req.body.price);

  const STRIPE_SK = "sk_test_wWyRuL3gsCaYM3j9n3yzrf0k";
  const stripe = Stripe(STRIPE_SK);
  stripe.charges.create(
    {
      currency: "usd",
      description: "Example Charge",
      amount: amount,
      source: token
    },
    (err, charge) => {
      if (err) {
        console.log("******POST api/pay FAIL!!******");
        console.log("err: ", err);
        return res.status(500);
      } else {
        console.log("******POST api/pay SUCCESS!!******");
        console.log("charge: ", charge);
        return res.json(charge);
      }
    }
  );
});

export default router;

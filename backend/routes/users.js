import express from "express";
import bcrypt from "bcrypt";
import isEmpty from "lodash/isEmpty";
import commonValidations from "../common/validations/signup";
import User from "../models/user";

const router = express.Router();

// GET api/users/:id
router.get("/:id", (req, res) => {
  console.log("******GET api/users/:id PASS!!******");
  const id = req.params.id;
  User.query({
    select: ["*"],
    where: { id: id }
  })
    .fetch()
    .then(user => {
      console.log("******Fetch user SUCCESS!!******");
      return res.json(user);
    })
    .catch(error => {
      console.log("******Fetch user FAIL!!******");
      return res.status(500).json({ error: error });
    });
});

export default router;

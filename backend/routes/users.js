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

// PUT api/users/:id/edit
router.put("/:id/edit", (req, res) => {
  console.log("******GET api/users/:id/edit PASS!!******");
  const id = req.params.id;
  const {
    email,
    username,
    timezone,
    password,
    fullname,
    education,
    company
  } = req.body;

  User.query({
    where: { id: id }
  })
    .fetch()
    .then(user => {
      if (bcrypt.compareSync(password, user.get("password_digest"))) {
        User.where({ id: id })
          .save(
            {
              timezone,
              fullname,
              education,
              company
            },
            { patch: true }
          )
          .then(() => {
            console.log("******PUT api/users/:id/edit SUCCESS!!******");
            User.where({ id: id })
              .fetch()
              .then(user => {
                return res.json({ success: true, user: user, id: id });
              });
          })
          .catch(err => {
            console.log("******PUT api/users/:id/edit FAIL!!******");
            return res.status(401).json({ error: err });
          });
      } else {
        res.status(401).json({ errors: { password: "Password Incorrect" } });
      }
    });
});

export default router;

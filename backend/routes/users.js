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

// PUT api/users/:id/edit/password
router.put("/:id/edit/password", (req, res) => {
  console.log("******PUT api/users/:id/edit/password PASS!!******");
  const id = req.params.id;
  const { password, newPassword } = req.body;

  User.where({ id: id })
    .fetch()
    .then(user => {
      if (bcrypt.compareSync(password, user.get("password_digest"))) {
        const password_digest = bcrypt.hashSync(newPassword, 10);

        User.where({ id: id })
          .save(
            {
              password_digest
            },
            { patch: true }
          )
          .then(user => {
            console.log(
              "******PUT api/users/:id/edit/password SUCCESS!!******"
            );
            return res.json({ valid: true, user: user, errors: {} });
          })
          .catch(err => {
            console.log("******PUT api/users/:id/edit/password FAIL!!******");
            return res.status(401).json({ errors: err });
          });
      } else {
        console.log("******PUT api/users/:id/edit/password FAIL!!******");
        return res.json({
          errors: { password: "Password Incorrect" },
          user: {},
          valid: false
        });
      }
    });
});

// PUT api/users/:id/edit/avatar
router.put("/:id/edit/avatar", (req, res) => {
  console.log("******PUT api/users/:id/edit/avatar PASS!!******");
  const id = req.params.id;
  const { avatar, password } = req.body;

  User.where({ id: id })
    .fetch()
    .then(user => {
      if (bcrypt.compareSync(password, user.get("password_digest"))) {
        User.where({ id: id })
          .save(
            {
              avatar
            },
            { patch: true }
          )
          .then(user => {
            console.log("******PUT api/users/:id/edit/avatar SUCCESS!!******");
            return res.json({ valid: true, user: user, errors: {} });
          })
          .catch(err => {
            console.log("******PUT api/users/:id/edit/avatar FAIL!!******");
            return res.json({ errors: err });
          });
      } else {
        console.log("******PUT api/users/:id/edit/avatar FAIL!!******");
        console.log("pass here!!");
        return res.json({
          errors: { password: "Password Incorrect" },
          user: {},
          valid: false
        });
      }
    });
});

// PUT api/users/:id/edit/basic
router.put("/:id/edit/basic", (req, res) => {
  console.log("******PUT api/users/:id/edit/basic PASS!!******");
  const id = req.params.id;
  const { timezone, password, fullname, education, company } = req.body;

  User.where({ id: id })
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
          .then(user => {
            console.log("******PUT api/users/:id/edit/basic SUCCESS!!******");
            return res.json({ valid: true, user: user, errors: {} });
          })
          .catch(err => {
            console.log("******PUT api/users/:id/edit/basic FAIL!!******");
            return res.json({ errors: err, valid: false });
          });
      } else {
        console.log("******PUT api/users/:id/edit/basic FAIL!!******");
        return res.json({
          errors: { password: "Password Incorrect" },
          user: {},
          valid: false
        });
      }
    });
});

export default router;

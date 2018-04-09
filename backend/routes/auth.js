import express from "express";
import bcrypt from "bcrypt";
import isEmpty from "lodash/isEmpty";
import commonValidations from "../common/validations/signup";
import User from "../models/user";
import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwtSecret";

const router = express.Router();

// check and validate user in the database
// :signup helper
const validateInput = (data, commonValidations) => {
  let { errors } = commonValidations(data);
  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  })
    .fetch()
    .then(user => {
      if (user) {
        if (user.get("username") === data.username) {
          errors.username = "User already existed";
        }
        if (user.get("email" === data.email)) {
          errors.email = "Email already existed";
        }
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
    })
    .catch(error => console.log("some error in validate Input"));
};

// FOR SIGN UP
// :POST to User Table
router.post("/signup", (req, res) => {
  console.log("******POST api/auth/signup SUCCESS!!******");
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      console.log("Pass input validation in server");
      const { username, password, timezone, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);
      // 插入数据库
      User.forge(
        {
          username,
          timezone,
          email,
          password_digest
        },
        { hasTimestamps: true }
      )
        .save()
        .then(user => {
          return res.json({ success: true });
        })
        .catch(err => {
          return res.status(500).json({ error: err });
        });
    } else {
      console.log("Does not pass input validation in server");
      res.status(500).json({ error: "we find existed users" });
    }
  });
});

router.post("/login", (req, res) => {
  console.log("******POST api/auth/login SUCCESS!!******");
  const { identifier, password } = req.body;
  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  })
    .fetch()
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.get("password_digest"))) {
          const token = jwt.sign(
            {
              id: user.get("id"),
              username: user.get("username")
            },
            jwtSecret.jwtSecret
          );
          return res.json({ token });
        } else {
          return res
            .status(401)
            .json({ errors: { password: "Password Incorrect" } });
        }
      } else {
        return res
          .status(401)
          .json({ errors: { identifier: "User not found" } });
      }
    });
});

router.get("/:identifier", (req, res) => {
  console.log("******GET api/auth//:identifier SUCCESS!!******");
  User.query({
    select: ["username", "email"],
    where: { username: req.params.identifier },
    orWhere: { email: req.params.identifier }
  })
    .fetch()
    .then(user => {
      res.json({ user });
    });
});

export default router;

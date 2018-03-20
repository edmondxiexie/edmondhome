import express from "express";
import bcrypt from "bcrypt";
import isEmpty from "lodash/isEmpty";
import commonValidations from "../common/validations/signup";
import User from "../models/user";

const router = express.Router();

// check and validate user in the database
const validateInput = (data, otherValidations) => {
  let { errors } = otherValidations(data);

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

router.post("/", (req, res) => {
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
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      console.log("Does not pass input validation in server");
      res.status(500).json({ error: "we find existed users" });
    }
  });
});

export default router;

const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          id: 1,
          email: "test@gmail.com",
          username: "test",
          timezone: "pacific",
          password_digest: bcrypt.hashSync("password", 10)
        })
      ]);
    });
};

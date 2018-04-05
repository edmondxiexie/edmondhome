exports.up = function(knex, Promise) {
  return knex.schema.createTable("wishlist", table => {
    table.increments();
    table.timestamps();
    table
      .integer("home_id")
      .notNullable()
      .references("id")
      .inTable("homes")
      .onDelete("CASCADE")
      .index();
    table
      .integer("keeper_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("wishlist");
};

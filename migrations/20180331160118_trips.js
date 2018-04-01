exports.up = function(knex, Promise) {
  return knex.schema.createTable("trips", table => {
    table.increments();
    table.string("check_in_time").notNullable();
    table.string("check_out_time").notNullable();
    table.string("reserved_guests").notNullable();
    table.timestamps();
    table
      .integer("home_id")
      .notNullable()
      .references("id")
      .inTable("homes")
      .onDelete("CASCADE")
      .index();
    table
      .integer("guest_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("trips");
};

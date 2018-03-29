exports.up = function(knex, Promise) {
  return knex.schema.createTable("homes", table => {
    table.increments();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("image").notNullable();
    table.string("host_id").notNullable();
    table.string("price").notNullable();
    table.string("district").notNullable();
    table.string("property_type").notNullable();
    table.string("room_type").notNullable();
    table.string("setup_for_guest").notNullable();
    table.string("guest_availability").notNullable();
    table.string("rooms_availability").notNullable();
    table.string("beds_availability").notNullable();
    table.string("bath_availability").notNullable();
    table.string("target").notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("homes");
};

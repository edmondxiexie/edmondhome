exports.up = function(knex, Promise) {
  return knex.schema.createTable("homes", table => {
    table.increments();
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("image").notNullable();
    table.string("price").notNullable();
    table.string("service_fee").notNullable();
    table.string("district").notNullable();
    table.string("address").notNullable();
    table.string("property_type").notNullable();
    table.string("room_type").notNullable();
    table.string("setup_for_guest").notNullable();
    table.string("guest_availability").notNullable();
    table.string("rooms_availability").notNullable();
    table.string("beds_availability").notNullable();
    table.string("bath_availability").notNullable();
    table.string("target").notNullable();
    table.text("amenities");
    table.text("otherAmenities");
    table.timestamps();
    table
      .integer("host_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("homes");
};

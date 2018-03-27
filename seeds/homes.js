const Faker = require("faker");

createHome = function(knex, id) {
  const imageUrls = [
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112935/8039654500_796cd8d4f0_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112935/8965577171_719591ff4d_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112935/14823475947_9e7c2b9718_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/4976907567_37478cc3ce_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/7591470070_59dccc57a3_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/5129896990_af0c2a272e_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/6284634531_00302f345f_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/27731502473_81fb0065e1_z.jpg",
    "http://res.cloudinary.com/dqace5qmb/image/upload/v1522112934/34601928261_e80211d848_z.jpg"
  ];

  return knex("homes").insert({
    id: id,
    title: Faker.name.jobTitle(),
    description: Faker.lorem.sentence(),
    img: Faker.random.arrayElement(imageUrls),
    host_id: "1",
    price: Faker.random.number({ min: 50, max: 500 }),
    district: Faker.address.city(),
    property_type: Faker.random.arrayElement(["APARTMENT", "HOUSE"]),
    room_type: Faker.random.arrayElement([
      "ENTIRE PLACE",
      "PRIVATE ROOM",
      "SHARED ROOM"
    ]),
    setup_for_guest: Faker.random.arrayElement([
      "Set up for guest",
      "Do it yourself",
      "Pay for clean up"
    ]),
    guest_availability: Faker.random.number({ min: 1, max: 12 }),
    rooms_availability: Faker.random.number({ min: 1, max: 4 }),
    beds_availability: Faker.random.number({ min: 1, max: 8 }),
    bath_availability: Faker.random.number({ min: 1, max: 3 }),
    target: Faker.lorem.sentence()
  });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("homes")
    .del()
    .then(function() {
      const homes = [];

      for (let i = 1; i <= 20; i++) {
        homes.push(createHome(knex, i));
      }

      return Promise.all(homes);
    });
};

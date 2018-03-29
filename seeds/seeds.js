const bcrypt = require("bcrypt");
const Faker = require("faker");

const USER_NUM = 50;
const HOME_NUM = USER_NUM * 20;

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

function buildHomeSeed(knex) {
  let res = [];
  for (let i = 1; i <= HOME_NUM; i++) {
    res.push(
      knex("homes").insert({
        title: Faker.name.jobTitle(),
        description: Faker.lorem.paragraph(),
        image: Faker.random.arrayElement(imageUrls),
        host_id: "1",
        price: Faker.random.number({ min: 50, max: 500 }),
        district: Faker.random.arrayElement([
          "LOS ANGELES",
          "SAN FRANCISCO",
          "PITTSBURGH",
          "SHANGHAI",
          "NEW YORK"
        ]),
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
        target: Faker.lorem.sentence(),
        updated_at: new Date(),
        created_at: new Date()
      })
    );
  }
  return res;
}

function buildUserSeed(knex) {
  let res = [];
  for (let i = 1; i <= USER_NUM; i++) {
    res.push(
      knex("users").insert({
        email: `user_${i}@gmail.com`,
        username: `user_${i}`,
        timezone: "pacific",
        password_digest: bcrypt.hashSync("password", 10),
        fullname: Faker.name.findName(),
        education: Faker.name.title(),
        company: Faker.company.companyName(),
        updated_at: new Date(),
        created_at: new Date()
      })
    );
  }
  return res;
}

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all(buildUserSeed(knex));
    })
    .then(function() {
      return knex("homes")
        .del()
        .then(function() {
          return Promise.all(buildHomeSeed(knex));
        });
    });
};

const bcrypt = require("bcrypt");
const Faker = require("faker");

const USER_NUM = 50;
const HOME_NUM = USER_NUM * 20;
const TRIP_NUM = USER_NUM * 20;
const WISHLIST_NUM = USER_NUM * 10;

const userSeedsData = require("./data/userSeedsData");
const homeSeedsData = require("./data/homeSeedsData");

function randomPick(options) {
  const optionsArr = [];

  for (let key in options) {
    const obj = {};
    obj.value = options[key];
    obj.label = key;
    optionsArr.push(obj);
  }

  const result = [];

  for (let option of optionsArr) {
    if (Faker.random.boolean()) {
      result.push(option);
    }
  }

  return result;
}

function buildHomeSeed(knex) {
  let res = [];
  for (let i = 1; i <= HOME_NUM; i++) {
    res.push(
      knex("homes").insert({
        title: Faker.random.arrayElement(homeSeedsData.titles),
        description: Faker.lorem.paragraph(),
        image: Faker.random.arrayElement(homeSeedsData.imageUrls),
        host_id: Faker.random.number({ min: 1, max: 50 }),
        price: Faker.random.number({ min: 50, max: 500 }),
        district: Faker.random.arrayElement(homeSeedsData.districts),
        property_type: Faker.random.arrayElement(["APARTMENT", "HOUSE"]),
        room_type: Faker.random.arrayElement(homeSeedsData.room_types),
        setup_for_guest: Faker.random.arrayElement(
          homeSeedsData.setup_for_guest
        ),
        guest_availability: Faker.random.number({ min: 1, max: 12 }),
        rooms_availability: Faker.random.number({ min: 1, max: 4 }),
        beds_availability: Faker.random.number({ min: 1, max: 8 }),
        bath_availability: Faker.random.number({ min: 1, max: 3 }),
        target: Faker.lorem.sentence(),
        amenities: JSON.stringify(randomPick(homeSeedsData.amenities)),
        otherAmenities: JSON.stringify(
          randomPick(homeSeedsData.otherAmenities)
        ),

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
        timezone: "Pacific/Honolulu",
        password_digest: bcrypt.hashSync("password", 10),
        fullname: Faker.name.findName(),
        education: Faker.name.title(),
        company: Faker.company.companyName(),
        avatar: Faker.random.arrayElement(userSeedsData.avatarUrls),
        phone: Faker.phone.phoneNumberFormat(),
        updated_at: new Date(),
        created_at: new Date()
      })
    );
  }
  return res;
}

function buildTripSeed(knex) {
  let res = [];
  for (let i = 1; i <= TRIP_NUM; i++) {
    let dFrom = new Date();
    dFrom.setDate(dFrom.getDate() - Math.floor(Math.random() * 3 + 1));
    let dTo = new Date();
    dTo.setDate(dTo.getDate() + Math.floor(Math.random() * 3 + 1));
    res.push(
      knex("trips").insert({
        check_in_time: dFrom,
        check_out_time: dTo,
        reserved_guests: Faker.random.number({ min: 1, max: 4 }),
        guest_id: Math.floor(Math.random() * USER_NUM + 1),
        home_id: Math.floor(Math.random() * HOME_NUM + 1),
        created_at: new Date(),
        updated_at: new Date()
      })
    );
  }
  return res;
}

function buildWishlistSeed(knex) {
  let res = [];
  for (let i = 1; i <= WISHLIST_NUM; i++) {
    res.push(
      knex("wishlist").insert({
        keeper_id: Math.floor(Math.random() * USER_NUM + 1),
        home_id: Math.floor(Math.random() * HOME_NUM + 1),
        created_at: new Date(),
        updated_at: new Date()
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
        })
        .then(function() {
          return knex("trips")
            .del()
            .then(function() {
              return Promise.all(buildTripSeed(knex));
            })
            .then(function() {
              return knex("wishlist")
                .del()
                .then(function() {
                  return Promise.all(buildWishlistSeed(knex));
                });
            });
        });
    });
};

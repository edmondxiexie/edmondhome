# Edmondbook

[http://www.edmondbook.com][edmondbook]

[edmondbook]: http://www.edmondbook.com

Edmondbook is a web application inspired by Airbnb.

### Backend

The backend is written with Node.js, Express and PostgreSQL database.

### Frontend

The frontend skeleton is written in React/Redux.

### Design

Sass is used to implement the style designing across the website.

### Tech Stack Links

Node.js, Express, React, Redux, Sass, Webpack, Knex.js, Bookshelf

## Features & Implementation

On the homepage, from the navigation bar on the top, user can sign up or sign in account. A "Demo" account is provided. The logo on the top left can always redirect the user back to the homepage. The "Homes" button will lead users to browse all the homes which they can book. The "Host your place" button will lead users to the page where they can host their own homes.

![image of homepage](docs/img/homepage-navbar-signup.png)

After signed in, the "Sign Up" and "Login" buttons will change to a badge which is the avatar of the user. The badge has a dropdown list including "Manage Host", "My Trips", "Wishlist", "Edit User Profile", "Log Out" options with respective functions.

The website takes username or email address as unique identifier. Either one can be accpected for login. The password verification is done in encryption, no password will be saved in the database.

![image of homepage after signed in](docs/img/homepage-navbar-logged.png)

### Homes

This page will show all the events from the database, supported with a search function. User can easily find a specific home typing keywords, (e.g. New York City). the keyword is case insensitive. On the right top corner of the home gallery card, there is a "Favorite" button. By clicking it you can put any home into your wishlist.

![image of homes page](docs/img/homes.png)

All the detail information of each home is shown on the individual home detail page. The information includes the home image, title, location, property type, host information, amenities, and so on.

![image of home detail page](docs/img/home-detail.gif)

User can book a place by chooing the check in date and check out date on the booking panel to the right. A "Auto Fill" button for demo is provided.

![image of home detail page](docs/img/booking-panel.gif)

User can also host their own place with all the required information, such as location, price, description, and so on. The uploaded pictures will be stored with a url from cloudinary, which can provided customized size of image, improving the image loading performance in different pages. User can enter this page by clicking "Host your place" button on the navigation bar.

![image of home detail page](docs/img/home-new.gif)

### Manage hosts

In the "Manage Hosts" page, users can manage the homes which they posted, including editing and deleting. By clicking the "Edit" button on the top right corner of the gallery card can enter the edit page.

![image of home detail page](docs/img/manage.png)

### Trips

In the "Trips" page, users can check the reservations which they booked.

![image of home detail page](docs/img/trips.gif)

### Wishlist

In the "Wishlist" page, users can check the homes which are saved in their favorite list.

![image of home detail page](docs/img/wishlist.png)

### Profile

In the "Profile" page, users can edit their profile and upload their avatars.

![image of home detail page](docs/img/profile.png)

## Database

### Table Schema

```javascript
// USERS
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("email")
      .notNullable()
      .unique();
    table
      .string("username")
      .notNullable()
      .unique();
    table.string("timezone").notNullable();
    table.string("password_digest").notNullable();
    table.string("fullname");
    table.string("education");
    table.string("company");
    table.string("avatar");
    table.string("phone");
    table.timestamps();
  });
};

// HOMES
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

// TRIPS
exports.up = function(knex, Promise) {
  return knex.schema.createTable("trips", table => {
    table.increments();
    table.string("order_id").notNullable();
    table.string("check_in_time").notNullable();
    table.string("check_out_time").notNullable();
    table.string("reserved_guests").notNullable();
    table.text("prices").notNullable();
    table.text("dates");

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

// WISHLIST
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
```

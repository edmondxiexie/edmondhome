// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "edmondhome"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: process.env.DATABASE_URL
    },
    pool: {
      max: 1,
      min: 1
    }
  }
};

// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "edmondhome"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL
  }
};

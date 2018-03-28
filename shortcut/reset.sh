dropdb edmondhome;
createdb edmondhome;
knex migrate:latest;
knex seed:run;
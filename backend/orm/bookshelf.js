const environment = process.env.NODE_ENV || "development";

console.log("in bookeshelf, environment is: ", environment);
import KnexConfig from "../../knexfile";
const knexConfig = KnexConfig[environment];
console.log("in bookeshelf, knexConfig is: ", knexConfig);

import Knex from "knex";
const knex = Knex(knexConfig);
import bookshelf from "bookshelf";
export default bookshelf(knex);

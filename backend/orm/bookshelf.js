const environment = process.env.NODE_ENV || "development";
import KnexConfig from "../../knexfile";
const knexConfig = KnexConfig[environment];
import Knex from "knex";
const knex = Knex(knexConfig);
import bookshelf from "bookshelf";
export default bookshelf(knex);

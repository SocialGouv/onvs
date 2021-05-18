const knexConfig = require("../../knexfile");

const environment = process.env.NODE_ENV || "development";

module.exports = require("knex")(knexConfig[environment]);

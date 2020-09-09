const knexConfig = require("../../knexfile")

const environment = process.env.NODE_ENV || "development"

export default require("knex")(knexConfig[environment])

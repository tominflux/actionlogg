const { genMongoApi } = require("@x-logg/util")
const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")

//

const allMethods = {
    ...actionlogMethods,
    ...archetypeMethods,
    ...recordMethods
}

//

const genActionloggMongoApi = (connection, database) => (
    genMongoApi(connection, database, allMethods)
)

module.exports = genActionloggMongoApi
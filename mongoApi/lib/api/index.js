const { genMongoApi } = require("@x-logg/util")
const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")
const { connect, createMongoCollection, deleteMongoCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../enums/collectionNames")

//

const initialiseActionlogg = async (options) => {
    //
    const { connection, database } = await connect(options)
    // Create all actionlogg collections.
    for (const key in COLLECTION_NAMES) {
        const collectionName = COLLECTION_NAMES[key]
        await createMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
}

const destroyActionlogg = async (options) => {
    // 
    const { connection, database } = await connect(options)
    // Delete all actionlogg collections.
    for (const collectionName of COLLECTION_NAMES) {
        await deleteMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
}

//

const allMethods = {
    initialiseActionlogg,
    destroyActionlogg,
    ...actionlogMethods,
    ...archetypeMethods,
    ...recordMethods
}

//

const genActionloggMongoApi = (connection, database) => (
    genMongoApi(connection, database, allMethods)
)

module.exports = genActionloggMongoApi